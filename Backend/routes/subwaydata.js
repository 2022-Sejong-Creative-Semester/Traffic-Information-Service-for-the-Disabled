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

		let sql = "Select *  FROM stationinfotest WHERE StNm like ?; ";

		let NameList = [];
		connection.query(sql, ["%"+stNm+"%"], function (err, results, fields) {
			if (err) {
				console.log(err);
			}
			for (let i = 0; i < results.length; i++) {
				if (results[i].LnNm[results[i].LnNm.length - 2] == "호") {
					results[i].LnNm = results[i].LnCd;
				}
				NameList.push({
					railCd: results[i].RailCd,
					lnCd: results[i].LnCd,
					lnNm: results[i].LnNm,
					stCd: results[i].StCd,
					stNm: results[i].StNm,
					tmX: "0",
					tmY: "0"

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

		let sql = "Select * FROM stationinfotest WHERE StCd = ? and StNm = ?;";

		connection.query(sql, [stCd, stNm], function (err, results, fields) {
			if (err) {
				console.log(err);
			}

			console.log("SubwayStationInfo");

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
			queryParams += '=' + encodeURI(results[0].RailCd);
			queryParams += '&' + encodeURI('lnCd');
			queryParams += '=' + encodeURI(results[0].LnCd);
			queryParams += '&' + encodeURI('stinCd');
			queryParams += '=' + encodeURI(results[0].StCd);
			queryParams += '&' + encodeURI('stinNm');
			queryParams += '=' + encodeURI(results[0].StNm);
			
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
					tNum: "000-0000-0000",
					wNum: "000-0000-0000"
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
						liftMoveInfo.push(liftInfo);
						liftInfo = [];
					}
				}
				liftInfo.push(liftMoveParse[i]);
			}
			if (liftInfo.length != 0) {
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
						elevatorMove.push(elevatorInfo);
						elevatorInfo = [];
					}
				}
				elevatorInfo.push(elevatorMoveParse[i]);
			}
			if (elevatorInfo.length != 0) {
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

		let sql = "Select * FROM stationinfotest WHERE (StCd = ? or StCd = ?) and LnCd = ? and RailCd = ?;";

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
						stCd: results[i].StCd,
						stNm: results[i].StNm,
						railCd: results[i].RailCd,
						lnCd: results[i].LnCd
					})
				}

			}
			transferList.push({
				sourceStation: sourceStation
			})
		});

		sql = "Select * FROM stationinfotest WHERE StNm = ?;";

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
				if (results[i].StCd != stCd) {
					const sql2 = "Select * FROM stationinfotest WHERE (StCd = ? or StCd = ?) and RailCd = ?;";
					connection.query(sql2, [parseInt(results[i].StCd) + 1, parseInt(results[i].StCd) - 1, results[i].RailCd], function (err, results2, fields) {
						console.log(results2);
						let transferStation = [];
						for (let j = 0; j < results2.length; j++) {
							transferStation.push({
								stCd: results2[j].StCd,
								stNm: results2[j].StNm,
								railCd: results2[j].RailCd,
								lnCd: results2[j].LnCd
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

		let sql = "Select * FROM stationinfotest WHERE StNm = ? and LnCd = ?;";
		let transferInfo = [];

		connection.query(sql, [stNm, chthTgtLn], function (err, results, fields) {

			console.log(results);

			if (err) {
				console.log(err);
			}

			let prevStinCd = "";

			if (parseInt(results[0].StCd) + 1 == parseInt(chtnNextStinCd)) {
				prevStinCd = parseInt(results[0].StCd) - 1;
			}
			else {
				prevStinCd = parseInt(results[0].StCd) + 1;
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
						//console.log("2호선");
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
			if (callback[0].error != null) {
				return res.status(500).json(callback[0])
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
			if (callback[0].error != null) {
				return res.status(500).json(callback[0]);
			}
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