const serviceKey = require('../Key/serviceKey.json');
const router = require('express').Router();
const request = require('request');
const convert = require('xml-js');

const SQL_info = require('../Key/SQL_info.json')
const mysql = require('mysql');

const conn = {
	host: SQL_info.host,
	port: SQL_info.port,
	user: SQL_info.user,
	password: SQL_info.password,
	database: SQL_info.database
};

let connection = mysql.createConnection(conn);  // DB Connect

//SubwayStation Name List from DB
function getSubwayStationName(stNm, callback){
	try {

		console.log("StationName");

		let sql = "Select *  FROM subcode_1 a, 도우미번호 b WHERE (a.stin_nm = b.역명 and a.ln_cd = b.운영노선명) and a.STIN_NM like ?; ";

		let NameList = [];
		connection.query(sql, ["%"+stNm+"%"], function (err, results, fields) {
			if (err) {
				console.log(err);
			}
			for (let i = 0; i < results.length; i++) {
				
				NameList.push({
					railCd: results[i].RAIL_OPR_ISTT_CD,
					lnCd: results[i].LN_CD,
					lnNm: results[i].LN_CD,
					stCd: results[i].STIN_CD,
					stNm: results[i].STIN_NM,
				})
			}

			callback(NameList);
		});
		
	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}

function getSubwayStationInfo(stCd, stNm, callback) {
	try {

		//let sql = "select * from subcode_1,subcode_2";
		let sql = "Select * FROM subcode_1 a, 도우미번호 b WHERE (a.stin_nm = b.역명 and a.ln_cd = b.운영노선명) and a.stin_cd = ? and a.stin_nm = ?";

		connection.query(sql, [stCd, stNm], function (err, results, fields) {
			if (err) {
				console.log(err);
			}

			console.log("SubwayStationInfo");
			//console.log(results);
			
			//NULL error
			if (results.length == 0) {
				return callback({
					error: 500,
					errorString: "No Such Station"
				})
			}

			const url = 'https://openapi.kric.go.kr/openapi/convenientInfo/stationInfo';
			let queryParams = '?' + encodeURI('serviceKey');
			queryParams += '=' + serviceKey.subwayRailKey;
			queryParams += '&' + encodeURI('format') + '=' + encodeURI('json');
			queryParams += '&' + encodeURI('railOprIsttCd');
			queryParams += '=' + encodeURI(results[0].RAIL_OPR_ISTT_CD);
			queryParams += '&' + encodeURI('lnCd');
			queryParams += '=' + encodeURI(results[0].LN_CD);
			queryParams += '&' + encodeURI('stinCd');
			queryParams += '=' + encodeURI(results[0].STIN_CD);
			queryParams += '&' + encodeURI('stinNm');
			queryParams += '=' + encodeURI(results[0].STIN_NM);
			
			return request({
				url: url + queryParams,
				method: 'GET'
			}, function (error, response, body) {

				const stationinfo = JSON.parse(body).body[0];

				callback({
					railCd: stationinfo.railOprIsttCd,
					lnCd: stationinfo.lnCd,
					stCd: stationinfo.stinCd,
					stNm: stationinfo.stinNm,
					roadNm: stationinfo.roadNmAdr,
					tmX: stationinfo.stinLocLon,
					tmY: stationinfo.stinLocLat,
					wNum: results[0].wnum,
					eName: results[0].en_name,
					fCode: results[0].f_code
				});
					
			});
			

		});

	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}

function getLiftPos(stCd, stNm, railCd, lnCd, callback) {
	try {

		console.log("LiftPos");

		const url = 'https://openapi.kric.go.kr/openapi/vulnerableUserInfo/stationWheelchairLiftLocation';
		let queryParams = '?' + encodeURI('serviceKey') + '=' + serviceKey.subwayRailKey;
		queryParams += '&' + encodeURI('format') + '=' + encodeURI('json');
		queryParams += '&' + encodeURI('railOprIsttCd') + '=' + encodeURI(railCd);
		queryParams += '&' + encodeURI('lnCd') + '=' + encodeURI(lnCd);
		queryParams += '&' + encodeURI('stinCd') + '=' + encodeURI(stCd);

		return request({
			url: url + queryParams,
			method: 'GET'
		}, function (error, response, body) {

			liftPosInfo = JSON.parse(body).body;

			callback(liftPosInfo[0]);

		});

	}
	catch {
		console.error(e);
		callback(e);
	}
}

function getLiftMove(stCd, stNm, railCd, lnCd, callback) {
	try {

		console.log("LiftMove");

		let liftMoveInfo = [];

		const url = 'https://openapi.kric.go.kr/openapi/vulnerableUserInfo/stationWheelchairLiftMovement';
		let queryParams = '?' + encodeURIComponent('serviceKey');
		queryParams += '=' + serviceKey.subwayRailKey;
		queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
		queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(railCd);
		queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(lnCd);
		queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(stCd);

		return request({
			url: url + queryParams,
			method: 'GET'
		}, function (error, response, body) {

			//목적지 별로 구분하여 제공
			const liftMoveParse = JSON.parse(body).body;

			let liftInfo = [];

			for (let i = 0; i < liftMoveParse.length; i++) {
				if (liftMoveParse[i].mvTpOrdr == 1) {
					if (liftInfo.length != 0) {
						const direction = liftInfo[liftInfo.length - 2].mvContDtl.split('승강장')[0].substr(3);
						liftInfo.unshift({
							direction: direction
						})

						liftMoveInfo.push(liftInfo);
						liftInfo = [];
					}
				}
				liftInfo.push(liftMoveParse[i]);
			}
			if (liftInfo.length != 0) {
				const direction = liftInfo[liftInfo.length - 2].mvContDtl.split('승강장')[0].substr(3);
				liftInfo.unshift({
					direction: direction
				})
				liftMoveInfo.push(liftInfo);
				liftInfo = [];
			}

			callback(liftMoveInfo);
		});
	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}

function getElevatorPos(stCd, stNm, railCd, lnCd, callback) {
	try {

		console.log("ElevatorPos");

		const url = 'https://openapi.kric.go.kr/openapi/convenientInfo/stationElevator';

		let queryParams = '?' + encodeURIComponent('serviceKey');
		queryParams += '=' + serviceKey.subwayRailKey;
		queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
		queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(railCd);
		queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(lnCd);
		queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(stCd);

		return request({
			url: url + queryParams,
			method: 'GET'
		}, function (error, response, body) {
			ElevatorPosInfo = JSON.parse(body).body;
			callback(ElevatorPosInfo);
		});
	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}


function getElevatorMove(stCd, stNm, railCd, lnCd, callback) {
	try {

		console.log("ElevatorMove");
		
		const url = 'https://openapi.kric.go.kr/openapi/trafficWeekInfo/stinElevatorMovement';
		let queryParams = '?' + encodeURIComponent('serviceKey');
		queryParams += '=' + serviceKey.subwayRailKey;
		queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
		queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(railCd);
		queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(lnCd);
		queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(stCd);

		let elevatorMove = [];

		return request({
			url: url + queryParams,
			method: 'GET'
		}, function (error, response, body) {

			let elevatorInfo = [];

			const elevatorMoveParse = JSON.parse(body).body;

			for (let i = 0; i < elevatorMoveParse.length; i++) {
				if (elevatorMoveParse[i].mvTpOrdr == 1) {
					if (elevatorInfo.length != 0) {
						const direction = elevatorInfo[elevatorInfo.length - 2].mvContDtl.split('승강장')[0].substr(3);
						elevatorInfo.unshift({
							direction: direction
						})
						elevatorMove.push(elevatorInfo);
						elevatorInfo = [];
					}
				}
				elevatorInfo.push(elevatorMoveParse[i]);
			}
			if (elevatorInfo.length != 0) {
				const direction = elevatorInfo[elevatorInfo.length - 2].mvContDtl.split('승강장')[0].substr(3);
				elevatorInfo.unshift({
					direction: direction
				})
				elevatorMove.push(elevatorInfo);
				elevatorInfo = [];
			}

			callback(elevatorMove);
		});
	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}


function getTransferList(stCd, stNm, railCd, lnCd, callback) {
	try { 
		let transferList = [];

		console.log("transferList");

		let sql = "Select * FROM subcode_1 WHERE (STIN_CD = ? or STIN_CD = ?) and LN_CD = ? and RAIL_OPR_ISTT_CD = ?;";

		connection.query(sql, [parseInt(stCd) + 1, parseInt(stCd) -1, lnCd, railCd], function (err, results, fields) {

			if (err) {
				console.log(err);
			}

			let sourceStation = [];

			if (results.length == 0) {
				return callback({
					error: 404,
					errorString: "Not Transfer Station"
				});
			}
			else {
				for (let i = 0; i < results.length; i++) {
					sourceStation.push({
						stCd: results[i].STIN_CD,
						stNm: results[i].STIN_NM,
						railCd: results[i].RAIL_OPR_ISTT_CD,
						lnCd: results[i].LN_CD
					})
				}

			}
			transferList.push({
				sourceStation: sourceStation
			})
		});

		sql = "Select * FROM subcode_1 WHERE STIN_NM = ?;";
		connection.query(sql, [stNm], function (err, results, fields) {

			if (err) {
				console.log(err);
			}

			if (results.length == 1) {
				return callback({
					error: 404,
					errorString: "Not Transfer Station"
				});
			}

			for (let i = 0; i < results.length; i++) {
				if (results[i].STIN_CD != stCd) {
					const sql2 = "Select * FROM subcode_1 WHERE (STIN_CD = ? or STIN_CD = ?) and RAIL_OPR_ISTT_CD = ?;";
					connection.query(sql2, [parseInt(results[i].STIN_CD) + 1, parseInt(results[i].STIN_CD) - 1, results[i].RAIL_OPR_ISTT_CD], function (err, results2, fields) {
						let transferStation = [];

						for (let j = 0; j < results2.length; j++) {
							transferStation.push({
								stCd: results2[j].STIN_CD,
								stNm: results2[j].STIN_NM,
								railCd: results2[j].RAIL_OPR_ISTT_CD,
								lnCd: results2[j].LN_CD
							})
						}
						transferList.push({
							transferStation: transferStation
						})
						callback(transferList);
					});
					
				}
			}
			
		});
		
	}

	catch (e) {
		console.error(e);
		callback(e);
	}
}

function getTransferInfo(stCd, stNm, railCd, lnCd, prev, chthTgtLn , chtnNextStinCd , callback) {
	try {

		let sql = "Select * FROM subcode_1 WHERE STIN_NM = ? and LN_CD = ?;";
		let transferInfo = [];

		connection.query(sql, [stNm, chthTgtLn], function (err, results, fields) {

			if (err) {
				console.log(err);
			}

			let prevStinCd = "";

			if (parseInt(results[0].STIN_CD) + 1 == parseInt(chtnNextStinCd)) {
				prevStinCd = parseInt(results[0].STIN_CD) - 1;
			}
			else {
				prevStinCd = parseInt(results[0].STIN_CD) + 1;
			}

			const url = 'https://openapi.kric.go.kr/openapi/vulnerableUserInfo/transferMovement';
			let queryParams = '?' + encodeURIComponent('serviceKey');
			queryParams += '=' + serviceKey.subwayRailKey;
			queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
			queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(railCd);
			queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(lnCd);
			queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(stCd);
			queryParams += '&' + encodeURIComponent('prevStinCd') + '=' + encodeURIComponent(prevStinCd);
			queryParams += '&' + encodeURIComponent('chthTgtLn') + '=' + encodeURIComponent(chthTgtLn);
			queryParams += '&' + encodeURIComponent('chtnNextStinCd') + '=' + encodeURIComponent(chtnNextStinCd);

			//chtnNextStinCd -> 상행선 1,3
			//chtnNextStinCd -> 하행선 2,4

			//parse Int  어캐해야됨
			//상행 하행 구분 어캐해야됨

			return request({
				url: url + queryParams,
				method: 'GET'
			}, function (error, response, body) {
				const parse = JSON.parse(body).body;

				for (let i = 0; i < parse.length; i++) {
					//성수가 211 하행
					//railCd로 비교

					//2호선의 경우 상 하행이 반대
					if (railCd == "S1" && lnCd == "2") {

						//환승역 방면이 상행선이라면 2, 4만 나옴
						if (parseInt(prevStinCd) > parseInt(chtnNextStinCd)) {
							//출발 방면이 상행선이라면
							if (parseInt(stCd) > parseInt(prev) && parse[i].mvPathMgNo == 2) {
								transferInfo.push(parse[i]);
							}
							//출발 방면이 하행선이라면
							else if (parseInt(stCd) < parseInt(prev) && parse[i].mvPathMgNo == 1) {
								transferInfo.push(parse[i]);
							}
						}
						//하행선인 경우
						else {
							//출발 방면이 상행선이라면
							if (parseInt(stCd) > parseInt(prev) && parse[i].mvPathMgNo == 4) {
								transferInfo.push(parse[i]);
							}
							//출발 방면이 하행선이라면
							else if (parseInt(stCd) < parseInt(prev) && parse[i].mvPathMgNo == 3) {
								transferInfo.push(parse[i]);
							}
						}
					}
					else {
						//환승역 방면이 상행선이라면 1,3만 나옴
						if (parseInt(prevStinCd) > parseInt(chtnNextStinCd)) {
							//출발 방면이 상행선이라면
							if (parseInt(stCd) > parseInt(prev) && parse[i].mvPathMgNo == 1) {
								transferInfo.push(parse[i]);
							}
							//출발 방면이 하행선이라면
							else if (parseInt(stCd) < parseInt(prev) && parse[i].mvPathMgNo == 3) {
								transferInfo.push(parse[i]);
							}
						}
						//하행선인 경우
						else {
							//출발 방면이 상행선이라면
							if (parseInt(stCd) > parseInt(prev) && parse[i].mvPathMgNo == 2) {
								transferInfo.push(parse[i]);
							}
							//출발 방면이 하행선이라면
							else if (parseInt(stCd) < parseInt(prev) && parse[i].mvPathMgNo == 4) {
								transferInfo.push(parse[i]);
							}
						}
					}
				}
				callback(transferInfo);
			});

		});

	}

	catch (e) {
		console.error(e);
		callback(e);
	}
}

function getConvenience(stCd, stNm, railCd, lnCd, callback) {
	try {

		let conveneinceInfo = [];

		const url = 'https://openapi.kric.go.kr/openapi/handicapped/stationCnvFacl';
		let queryParams = '?' + encodeURIComponent('serviceKey');
		queryParams += '=' + serviceKey.subwayRailKey;
		queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
		queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(railCd);
		queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(lnCd);
		queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(stCd);

		return request({
			url: url + queryParams,
			method: 'GET'
		}, function (error, response, body) {
			const parse = JSON.parse(body).body;

			for (let i = 0; i < parse.length; i++) {
				if (parse[i].gubun == "EV" || parse[i].gubun == "WCLF") {
					conveneinceInfo.push(parse[i]);
				}
			}

			//No Data
			if (conveneinceInfo.length == 0) {
				conveneinceInfo.push({
					error: 404,
					errorString: "No conveneince"
				})
			}

			callback(conveneinceInfo);
		});
	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}

router.get('/stNm/:stNm', async (req, res) => {
	try {

		stNm = req.params.stNm;

		await getSubwayStationName(stNm, stationList => {
			if (stationList == 0) {
				return res.status(500).json({
					error: "No Station"
				})
			}
			else {
				return res.json(
					stationList,
				)
			}

		});
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		})
	}
})

router.get('/stationInfo/:stCd/:stNm', async (req, res) => {
	try {

		stCd = req.params.stCd;
		stNm = req.params.stNm;

		await getSubwayStationInfo(stCd, stNm, stationinfo => {
			return res.json({
				stationinfo
			})
		})
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		})
	}
})

router.get('/liftPos/:stCd/:stNm/:railCd/:lnCd', async (req, res) => {
	try {
		stCd = req.params.stCd;
		stNm = req.params.stNm;
		railCd = req.params.railCd;
		lnCd = req.params.lnCd;

		await getLiftPos(stCd, stNm, railCd, lnCd, liftPosInfo => {

			return res.json({
				"railOprIsttCd": liftPosInfo.railOprIsttCd,
				"lnCd": liftPosInfo.lnCd,
				"stinCd": liftPosInfo.stinCd,
				"exitNo": liftPosInfo.exitNo,
				"dtlLoc": liftPosInfo.dtlLoc,
				"grndDvNmFr": liftPosInfo.grndDvNmFr,
				"runStinFlorFr": liftPosInfo.runStinFlorFr,
				"grndDvNmTo": liftPosInfo.grndDvNmTo,
				"runStinFlorTo": liftPosInfo.runStinFlorTo,
				"len": liftPosInfo.len,
				"wd": liftPosInfo.wd,
				"bndWgt": liftPosInfo.bndWgt
			});
		})

		
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		})
	}
})

router.get('/liftMove/:stCd/:stNm/:railCd/:lnCd', async (req, res) => {
	console.log("liftMove");
	try {
		stCd = req.params.stCd;
		stNm = req.params.stNm;
		railCd = req.params.railCd;
		lnCd = req.params.lnCd;

		await getLiftMove(stCd, stNm, railCd, lnCd, callback => {
			return res.json(callback);
		});
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		})
	}
})

router.get('/ElevatorPos/:stCd/:stNm/:railCd/:lnCd', async (req, res) => {
	try {
		stCd = req.params.stCd;
		stNm = req.params.stNm;
		railCd = req.params.railCd;
		lnCd = req.params.lnCd;

		await getElevatorPos(stCd, stNm, railCd, lnCd, callback => {
			return res.json(callback)
		});
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		})
	}
})

router.get('/ElevatorMove/:stCd/:stNm/:railCd/:lnCd', async (req, res) => {
	try {
		stCd = req.params.stCd;
		stNm = req.params.stNm;
		railCd = req.params.railCd;
		lnCd = req.params.lnCd;

		await getElevatorMove(stCd, stNm, railCd, lnCd, callback => {
			return res.json(callback);
		});
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		})
	}
})


router.get('/transferMove/transferList/:stCd/:stNm/:railCd/:lnCd', async (req, res) => {
	try {

		stCd = req.params.stCd;
		stNm = req.params.stNm;
		railCd = req.params.railCd;
		lnCd = req.params.lnCd;

		await getTransferList(stCd, stNm, railCd, lnCd, callback => {
			if (callback.error != null) {
				return res.status(500).json(callback)
			}
			return res.json(callback)
		});
		
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		})
	}
});

router.get('/transferMove/transferInfo/:stCd/:stNm/:railCd/:lnCd/:prevStinCd/:chthTgtLn/:chtnNextStinCd', async (req, res) => {
	try {

		stCd = req.params.stCd;
		stNm = req.params.stNm;
		railCd = req.params.railCd;
		lnCd = req.params.lnCd;
		prevStinCd = req.params.prevStinCd;
		chthTgtLn = req.params.chthTgtLn;
		chtnNextStinCd = req.params.chtnNextStinCd;

		await getTransferInfo(stCd, stNm, railCd, lnCd, prevStinCd, chthTgtLn, chtnNextStinCd, callback => {
			
			return res.json(callback)
		});

	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		})
	}
});

router.get('/convenience/:stCd/:stNm/:railCd/:lnCd', async (req, res) => {
	try {
		stCd = req.params.stCd;
		stNm = req.params.stNm;
		railCd = req.params.railCd;
		lnCd = req.params.lnCd;

		await getConvenience(stCd, stNm, railCd, lnCd, callback => {
			if (callback.error != null) {
				return res.status(500).json(callback[0]);
			}
			else return res.json(callback);
		});

		
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		})
	}
});

router.get('/nevigation', async (req, res) => {
	try {
		return res.json({

		})
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		})
	}
});

module.exports = router;
