import serviceKey from '../KEY/serviceKey.json'
import express, {Request, Response, Router} from 'express'
import request from 'request'
import * as db from '../db'
import mysql from 'mysql'

import {SubwayStationNameList, SubwayStationInfo, SubwayStationInfoRequest, SubwayStationLiftPos, SubwayStationLiftMove, SubwayStationLiftInfo, SubwayStationElevatorPosInfo, SubwayStationElevatorMove, SubwayStationElevatorMoveInfo, SubwayStationConvenience, SubwayStationConvenienceInfo, SubwayStationTransferStationInfo, SubwayStationTransferInfo, SubwayStationTransferMoveList} from '../../interfaces/Subway/subway.interface'


const router:Router = express.Router();

//SubwayStation Name List from DB
function getSubwayStationName(stNm:string, callback:(nameList:Array<SubwayStationNameList>)=>void){
	try {

		const connection:mysql.connection = db.return_connection();

		let SQL:string = "Select *  FROM subcode_1 a, 도우미번호 b WHERE (a.stin_nm = b.역명 and a.ln_cd = b.운영노선명) and a.STIN_NM like ?; ";

		let nameList:Array<SubwayStationNameList> = [];

		connection.query(SQL, ["%"+stNm+"%"], function (err:Error, results:any, fields:any) {
			if (err) {
				console.log(err);
			}

			for (let i = 0; i < results.length; i++) {
				
				nameList.push({
					railCd: results[i].RAIL_OPR_ISTT_CD,
					lnCd: results[i].LN_CD,
					lnNm: results[i].LN_CD,
					stCd: results[i].STIN_CD,
					stNm: results[i].STIN_NM,
				})
			}

			callback(nameList);
		});
		
	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}

function getSubwayStationInfo(stCd:string, stNm:string, callback:(stationInfo:SubwayStationInfo|null)=>void) {
	try {

		const connection:mysql.connection = db.return_connection();

		let sql:string = "Select * FROM subcode_1 a, 도우미번호 b WHERE (a.stin_nm = b.역명 and a.ln_cd = b.운영노선명) and a.stin_cd = ? and a.stin_nm = ?";

		connection.query(sql, [stCd, stNm], function (err:Error, results:any, fields:any) {
			if (err) {
				console.log(err);
			}
			
			//NULL error
			if (results.length === 0) {
				return callback(null);
			}
			
			const url:string = 'https://openapi.kric.go.kr/openapi/convenientInfo/stationInfo';
			let queryParams:string = '?' + encodeURI('serviceKey');
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
			}, function (error:Error, response:any, body:string) {

				const stationinfo:SubwayStationInfoRequest = JSON.parse(body).body[0];

				//NULL error
				if (stationinfo === undefined) {
					return callback(null);
				}

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

function getLiftPos(stCd:string, stNm:string, railCd:string, lnCd:string, callback:(liftPosInfo:SubwayStationLiftPos|null)=>void) {
	try {

		const url:string = 'https://openapi.kric.go.kr/openapi/vulnerableUserInfo/stationWheelchairLiftLocation';
		let queryParams:string = '?' + encodeURI('serviceKey') + '=' + serviceKey.subwayRailKey;
		queryParams += '&' + encodeURI('format') + '=' + encodeURI('json');
		queryParams += '&' + encodeURI('railOprIsttCd') + '=' + encodeURI(railCd);
		queryParams += '&' + encodeURI('lnCd') + '=' + encodeURI(lnCd);
		queryParams += '&' + encodeURI('stinCd') + '=' + encodeURI(stCd);

		return request({
			url: url + queryParams,
			method: 'GET'
		}, function (error:Error, response:any, body:any) {
			const liftPosInfo:Array<SubwayStationLiftPos> = JSON.parse(body).body;

			if(liftPosInfo === undefined){
				callback(null);
			}
			
			else callback(liftPosInfo[0]);

		});

	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}

function getLiftMove(stCd:string, stNm:string, railCd:string, lnCd:string, callback:(liftMoveInfo:Array<SubwayStationLiftInfo>)=>void) {
	try {

		const liftMoveInfo:Array<SubwayStationLiftInfo> = [];

		const url:string = 'https://openapi.kric.go.kr/openapi/vulnerableUserInfo/stationWheelchairLiftMovement';
		let queryParams:string = '?' + encodeURIComponent('serviceKey');
		queryParams += '=' + serviceKey.subwayRailKey;
		queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
		queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(railCd);
		queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(lnCd);
		queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(stCd);

		return request({
			url: url + queryParams,
			method: 'GET'
		}, async function (error:Error, response:any, body:any) {

			//목적지 별로 구분하여 제공
			const liftMoveParse:Array<SubwayStationLiftMove> = JSON.parse(body).body;

			if(liftMoveParse === undefined){
				return callback(null);
			}

			let liftInfo:SubwayStationLiftInfo = {
				direction: "",
				info: []
			};
			
			//비동기 처리
			for (let i = 0; i < liftMoveParse.length; i++) {

					
				if (liftMoveParse[i].mvTpOrdr === 1) {
					if (liftInfo.info.length !== 0) {
						const direction:string = liftInfo.info[liftInfo.info.length - 2].mvContDtl.split('승강장')[0].substr(3);
						liftInfo.direction = direction;

						liftMoveInfo.push(liftInfo);
						liftInfo.direction = "";
						liftInfo.info = [];
					}
				}
				liftInfo.info.push(liftMoveParse[i]);
			}

			const direction:string = liftInfo.info[liftInfo.info.length - 2].mvContDtl.split('승강장')[0].substr(3);
			liftInfo.direction = direction;
			liftMoveInfo.push(liftInfo);

			callback(liftMoveInfo);
		});
	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}

function getElevatorPos(stCd:string, stNm:string, railCd:string, lnCd:string, callback:(ElevatorPosInfo:SubwayStationElevatorPosInfo)=>void) {
	try {
		const url:string = 'https://openapi.kric.go.kr/openapi/convenientInfo/stationElevator';

		let queryParams:string = '?' + encodeURIComponent('serviceKey');
		queryParams += '=' + serviceKey.subwayRailKey;
		queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
		queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(railCd);
		queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(lnCd);
		queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(stCd);

		return request({
			url: url + queryParams,
			method: 'GET'
		}, function (error:Error, response:any, body:any) {
			const ElevatorPosInfo:SubwayStationElevatorPosInfo = JSON.parse(body).body;

			if(ElevatorPosInfo === undefined){
				return callback(null);
			}
			else{
				callback(ElevatorPosInfo);
			}
		});
	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}


function getElevatorMove(stCd:string, stNm:string, railCd:string, lnCd:string, callback:(elevatorMove:Array<SubwayStationElevatorMoveInfo>)=>void) {
	try {
		
		const url:string = 'https://openapi.kric.go.kr/openapi/trafficWeekInfo/stinElevatorMovement';
		let queryParams:string = '?' + encodeURIComponent('serviceKey');
		queryParams += '=' + serviceKey.subwayRailKey;
		queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
		queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(railCd);
		queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(lnCd);
		queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(stCd);

		let elevatorMove:Array<SubwayStationElevatorMoveInfo> = [];

		return request({
			url: url + queryParams,
			method: 'GET'
		}, function (error:Error, response:any, body:any) {

			let elevatorInfo:SubwayStationElevatorMoveInfo = {
				direction: "",
				info: []
			};

			const elevatorMoveParse:Array<SubwayStationElevatorMove> = JSON.parse(body).body;

			if(elevatorMoveParse === undefined){
				return callback(null);
			}

			else{
				for (let i = 0; i < elevatorMoveParse.length; i++) {
					if (elevatorMoveParse[i].mvTpOrdr === 1) {
						if (elevatorInfo.info.length !== 0) {
							const direction:string = elevatorInfo.info[elevatorInfo.info.length - 2].mvContDtl.split('승강장')[0].substr(3);
							elevatorInfo.direction = direction;
	
							elevatorMove.push(elevatorInfo);
							elevatorInfo.direction = "";
							elevatorInfo.info = [];
						}
					}
					elevatorInfo.info.push(elevatorMoveParse[i]);
				}
				
				const direction:string = elevatorInfo.info[elevatorInfo.info.length - 2].mvContDtl.split('승강장')[0].substr(3);
				elevatorInfo.direction = direction;
				
				elevatorMove.push(elevatorInfo);
	
				callback(elevatorMove);
			}	
		});
	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}

function getTransferList(stCd:string, stNm:string, railCd:string, lnCd:string, callback:(transferList:SubwayStationTransferInfo)=>void) {
	try { 
		
		const connection:mysql.connection = db.return_connection();

		let transferList:SubwayStationTransferInfo = {
			sourceStation: [],
			transferStation: []
		};

		let sql:string = "Select * FROM subcode_1 WHERE (STIN_CD = ? or STIN_CD = ?) and LN_CD = ? and RAIL_OPR_ISTT_CD = ?;";

		connection.query(sql, [parseInt(stCd) + 1, parseInt(stCd) -1, lnCd, railCd], function (err:Error, results:any, fields:any) {

			if (err) {
				console.log(err);
			}

			let sourceStation:Array<SubwayStationTransferStationInfo> = [];
			
			for (let i = 0; i < results.length; i++) {
				sourceStation.push({
					stCd: results[i].STIN_CD,
					stNm: results[i].STIN_NM,
					railCd: results[i].RAIL_OPR_ISTT_CD,
					lnCd: results[i].LN_CD
				})
			}
			transferList.sourceStation = sourceStation;
		});

		sql = "Select * FROM subcode_1 WHERE STIN_NM = ?;";
		connection.query(sql, [stNm], function (err:Error, results:any, fields:any) {

			if (err) {
				console.log(err);
			}

			if (results.length === 0 || results.length === 1) {
				return callback(null);
			}

			else{
				for (let i = 0; i < results.length; i++) {
					if (results[i].STIN_CD != stCd) {
						const sql2:string = "Select * FROM subcode_1 WHERE (STIN_CD = ? or STIN_CD = ?) and RAIL_OPR_ISTT_CD = ?;";
						connection.query(sql2, [parseInt(results[i].STIN_CD) + 1, parseInt(results[i].STIN_CD) - 1, results[i].RAIL_OPR_ISTT_CD], function (err:Error, results2:any, fields:any) {
							let transferStation:Array<SubwayStationTransferStationInfo> = [];
	
							if(results.length === 0){
								return callback(null);
							}
							else{
								for (let j = 0; j < results2.length; j++) {
									transferStation.push({
										stCd: results2[j].STIN_CD,
										stNm: results2[j].STIN_NM,
										railCd: results2[j].RAIL_OPR_ISTT_CD,
										lnCd: results2[j].LN_CD
									})
								}
								transferList.transferStation = transferStation;
								
								callback(transferList);
							}
							
						});
						
					}
				}
			}
			
		});
		
	}

	catch (e) {
		console.error(e);
		callback(e);
	}
}

function getTransferInfo(stCd:string, stNm:string, railCd:string, lnCd:string, prev:string, chthTgtLn:string, chtnNextStinCd:string , callback:(transferInfo:Array<SubwayStationTransferMoveList>)=>void) {
	try {

		const connection:mysql.connection = db.return_connection();
		
		let sql:string = "Select * FROM subcode_1 WHERE STIN_NM = ? and LN_CD = ?;";
		let transferInfo:Array<SubwayStationTransferMoveList> = [];

		connection.query(sql, [stNm, chthTgtLn], function (err:Error, results:any, fields:any) {

			if (err) {
				console.log(err);
			}

			if(results.length === 0){
				return callback(null);
			}

			let prevStinCd:number;

			if (parseInt(results[0].STIN_CD) + 1 === parseInt(chtnNextStinCd)) {
				prevStinCd = parseInt(results[0].STIN_CD) - 1;
			}
			else {
				prevStinCd = parseInt(results[0].STIN_CD) + 1;
			}

			const url:string = 'https://openapi.kric.go.kr/openapi/vulnerableUserInfo/transferMovement';
			let queryParams:string = '?' + encodeURIComponent('serviceKey');
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
			}, function (error:Error, response:any, body:any) {
				const parse:Array<SubwayStationTransferMoveList> = JSON.parse(body).body;

				if(parse === undefined){
					return callback(null);
				}
				else {
					for (let i = 0; i < parse.length; i++) {
						//성수가 211 하행
						//railCd로 비교
	
						//2호선의 경우 상 하행이 반대
						if (railCd === "S1" && lnCd === "2") {
							//환승역 방면이 상행선이라면 2, 4만 나옴
							if (prevStinCd > parseInt(chtnNextStinCd)) {
								//출발 방면이 상행선이라면
								if (parseInt(stCd) > parseInt(prev) && parse[i].mvPathMgNo === 2) {
									transferInfo.push(parse[i]);
								}
								//출발 방면이 하행선이라면
								else if (parseInt(stCd) < parseInt(prev) && parse[i].mvPathMgNo === 1) {
									transferInfo.push(parse[i]);
								}
							}
							//하행선인 경우
							else {
								//출발 방면이 상행선이라면
								if (parseInt(stCd) > parseInt(prev) && parse[i].mvPathMgNo === 4) {
									transferInfo.push(parse[i]);
								}
								//출발 방면이 하행선이라면
								else if (parseInt(stCd) < parseInt(prev) && parse[i].mvPathMgNo === 3) {
									transferInfo.push(parse[i]);
								}
							}
						}
						else {
							//환승역 방면이 상행선이라면 1,3만 나옴
							if (prevStinCd > parseInt(chtnNextStinCd)) {
								//출발 방면이 상행선이라면
								if (parseInt(stCd) > parseInt(prev) && parse[i].mvPathMgNo === 1) {
									transferInfo.push(parse[i]);
								}
								//출발 방면이 하행선이라면
								else if (parseInt(stCd) < parseInt(prev) && parse[i].mvPathMgNo === 3) {
									transferInfo.push(parse[i]);
								}
							}
							//하행선인 경우
							else {
								//출발 방면이 상행선이라면
								if (parseInt(stCd) > parseInt(prev) && parse[i].mvPathMgNo === 2) {
									transferInfo.push(parse[i]);
								}
								//출발 방면이 하행선이라면
								else if (parseInt(stCd) < parseInt(prev) && parse[i].mvPathMgNo === 4) {
									transferInfo.push(parse[i]);
								}
							}
						}
					}
					callback(transferInfo);
				}
			});

		});

	}

	catch (e) {
		console.error(e);
		callback(e);
	}
}

function getConvenience(stCd:string, stNm:string, railCd:string, lnCd:string, callback:(conveneinceInfo:Array<SubwayStationConvenience>|null)=>void) {
	try {

		const conveneinceInfo:Array<SubwayStationConvenience> = [];

		const url:string = 'https://openapi.kric.go.kr/openapi/handicapped/stationCnvFacl';
		let queryParams:string = '?' + encodeURIComponent('serviceKey');
		queryParams += '=' + serviceKey.subwayRailKey;
		queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
		queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(railCd);
		queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(lnCd);
		queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(stCd);

		return request({
			url: url + queryParams,
			method: 'GET'
		}, function (error:Error, response:any, body:any) {
			const parse:Array<SubwayStationConvenience> = JSON.parse(body).body;

			if(parse === undefined){
				callback(null);
			}
			else {
				for (let i = 0; i < parse.length; i++) {
					if (parse[i].gubun === "EV" || parse[i].gubun === "WCLF") {
						conveneinceInfo.push(parse[i]);
					}
				}

				callback(conveneinceInfo);
			}
		});
	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}

router.get('/stNm/:stNm', async (req:Request, res:Response) => {
	try {

		const stNm = req.params.stNm;

		await getSubwayStationName(stNm, stationList => {
			if (stationList.length === 0) {
				return res.status(500).json({
					error: "No Station"
				})
			}
			else {
				return res.status(200).json(
					stationList
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

router.get('/stationInfo/:stCd/:stNm', async (req:Request, res:Response) => {
	try {

		const stCd = req.params.stCd;
		const stNm = req.params.stNm;

		await getSubwayStationInfo(stCd, stNm, stationinfo => {
			if(stationinfo === null){
				return res.status(500).json({
					error: "No Station"
				})
			}

			else{
				return res.status(200).json({
					stationinfo
				})
			}
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

router.get('/liftPos/:stCd/:stNm/:railCd/:lnCd', async (req:Request, res:Response) => {
	try {
		const stCd = req.params.stCd;
		const stNm = req.params.stNm;
		const railCd = req.params.railCd;
		const lnCd = req.params.lnCd;

		await getLiftPos(stCd, stNm, railCd, lnCd, liftPosInfo => {

			//null인 경우
			if(liftPosInfo===null){
				return res.status(200).json([]);
			}

			else{
				return res.status(200).json({
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
			}
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

router.get('/liftMove/:stCd/:stNm/:railCd/:lnCd', async (req:Request, res:Response) => {
	try {
		const stCd = req.params.stCd;
		const stNm = req.params.stNm;
		const railCd = req.params.railCd;
		const lnCd = req.params.lnCd;

		await getLiftMove(stCd, stNm, railCd, lnCd, callback=> {
			if(callback === null){
				return res.status(200).json([]);
			}

			else {
				return res.status(200).json(callback);
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

router.get('/ElevatorPos/:stCd/:stNm/:railCd/:lnCd', async (req:Request, res:Response) => {
	try {
		const stCd = req.params.stCd;
		const stNm = req.params.stNm;
		const railCd = req.params.railCd;
		const lnCd = req.params.lnCd;

		await getElevatorPos(stCd, stNm, railCd, lnCd, callback => {
			if(callback===null){
				return res.status(200).json([]);
			}
			return res.status(200).json(callback)
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

router.get('/ElevatorMove/:stCd/:stNm/:railCd/:lnCd', async (req:Request, res:Response) => {
	try {
		const stCd = req.params.stCd;
		const stNm = req.params.stNm;
		const railCd = req.params.railCd;
		const lnCd = req.params.lnCd;

		await getElevatorMove(stCd, stNm, railCd, lnCd, callback => {
			if(callback === null){
				return res.status(200).json([]);
			}
			else {
				return res.status(200).json(callback);
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


router.get('/transferMove/transferList/:stCd/:stNm/:railCd/:lnCd', async (req:Request, res:Response) => {
	try {

		const stCd = req.params.stCd;
		const stNm = req.params.stNm;
		const railCd = req.params.railCd;
		const lnCd = req.params.lnCd;

		await getTransferList(stCd, stNm, railCd, lnCd, transferInfo => {
			if(transferInfo === null)
			{
				return res.status(500).json({
					error: 500,
					errorString: "Not Transfer Station"
				})
			}
			else if (transferInfo.sourceStation.length === 0 || transferInfo.transferStation.length === 0) {
				return res.status(500).json({
					error: 500,
					errorString: "Not Transfer Station"
				})
			}
			else {
				return res.status(200).json(transferInfo)
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
});

router.get('/transferMove/transferInfo/:stCd/:stNm/:railCd/:lnCd/:prevStinCd/:chthTgtLn/:chtnNextStinCd', async (req:Request, res:Response) => {
	try {

		const stCd = req.params.stCd;
		const stNm = req.params.stNm;
		const railCd = req.params.railCd;
		const lnCd = req.params.lnCd;
		const prevStinCd = req.params.prevStinCd;
		const chthTgtLn = req.params.chthTgtLn;
		const chtnNextStinCd = req.params.chtnNextStinCd;

		await getTransferInfo(stCd, stNm, railCd, lnCd, prevStinCd, chthTgtLn, chtnNextStinCd, callback => {
			
			if(callback === null){
				return res.status(200).json([]);
			}

			else {
				return res.status(200).json(callback);
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
});

router.get('/convenience/:stCd/:stNm/:railCd/:lnCd', async (req:Request, res:Response) => {
	try {
		const stCd:string = req.params.stCd;
		const stNm:string = req.params.stNm;
		const railCd:string = req.params.railCd;
		const lnCd:string = req.params.lnCd;

		await getConvenience(stCd, stNm, railCd, lnCd, conveneinceInfo => {
			
			//No Data
			if (conveneinceInfo === null) {
				return res.status(500).json({
					error: 404,
					errorString: "No conveneince"
				})
			}
			else {
				return res.status(200).json(conveneinceInfo);
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
});

export = router;
