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

		let sql = "Select *  FROM test WHERE StNm like ?; ";

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
					stNm: results[i].StNm
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

function getSubwayStationInfo(stCd, callback) {
	try {

		let sql = "Select *  FROM test WHERE StCd = ?;";

		connection.query(sql, [stCd], function (err, results, fields) {
			if (err) {
				console.log(err);
			}

			console.log(results);

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

			//console.log(url + queryParams);

			return request({
				url: url + queryParams,
				method: 'GET'
			}, function (error, response, body) {

				//console.log(body);

				const stationinfo = JSON.parse(body).body[0];
				
				callback({
					railCd: stationinfo.railOprIsttCd,
					lnCd: stationinfo.lnCd,
					stCd: stationinfo.stinCd,
					stNm: stationinfo.stinNm,
					roadNm: stationinfo.roadNmAdr,
					tmX: stationinfo.stinLocLon,
					tmY: stationinfo.stinLocLat
				});
			});

		});

	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}

function getSubwayStationInfo(stCd, callback) {
	try {

		let sql = "Select * FROM test WHERE StCd = ?;";

		connection.query(sql, [stCd], function (err, results, fields) {
			if (err) {
				console.log(err);
			}

			console.log(results);

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

			//console.log(url + queryParams);

			return request({
				url: url + queryParams,
				method: 'GET'
			}, function (error, response, body) {

				//console.log(body);

				const stationinfo = JSON.parse(body).body[0];

				callback({
					railCd: stationinfo.railOprIsttCd,
					lnCd: stationinfo.lnCd,
					stCd: stationinfo.stinCd,
					stNm: stationinfo.stinNm,
					roadNm: stationinfo.roadNmAdr,
					tmX: stationinfo.stinLocLon,
					tmY: stationinfo.stinLocLat,
					//tNum: 
					//wNum:
				});
			});

		});

	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}

function getLiftRoute(stCd, callback) {
	try {

		console.log(stNm);

		const url = 'https://openapi.kric.go.kr/openapi/vulnerableUserInfo/stationWheelchairLiftMovement';
		let queryParams = '?' + encodeURIComponent('serviceKey');
		queryParams += '=' + serviceKey.iiftRouteKey;
		queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
		queryParams += '&' + encodeURIComponent('railOprIsttCd');
		queryParams += '/' + encodeURIComponent('1');
		queryParams += '/' + encodeURIComponent('5');
		queryParams += '/' + encodeURIComponent(stNm) + '/';

		console.log(url + queryParams);

		const tempurl = 'http://openapi.seoul.go.kr:8088/' + serviceKey.subwayStNmKey + '/json/SearchInfoBySubwayNameService/1/5/%EC%A2%85%EB%A1%9C3%EA%B0%80/';
		console.log(url + queryParams);
		console.log(tempurl);
		return request({
			url: url + queryParams,
			method: 'GET'
		}, function (error, response, body) {
			console.log(body);
			callback(body);
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
				return res.status(404).json({
					error: "No Station"
				})
			}
			else {
				console.log(stationList);
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

router.get('/stationInfo/:stinCd', async (req, res) => {
	try {
		stCd = req.params.stinCd;

		await getSubwayStationInfo(stCd, stationinfo => {
			//console.log(stationinfo.tmY);
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

router.get('/liftPos/stinCd/:stinCd/', async (req, res) => {
	try {
		return res.json({
			"header": {
				"resultCnt": 0,
				"resultCode": "03",
				"resultMsg": "데이터가 없습니다."
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

router.get('/liftMove/stinCd/:stinCd', async (req, res) => {
	console.log("liftMove");
	try {
		/*
		stNm = req.params.stNm;
		await getLiftRoute(stNm,stationName => {
			return res.json({
				stNm: stationName,
			})
		});
		*/
		return res.json({
			"header": {
				"resultCnt": 12,
				"resultCode": "00",
				"resultMsg": "정상 처리되었습니다."
			},
			"body": [
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 1,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 1,
					"mvDst": null,
					"mvContDtl": "1) (1F) 6번 출입구 옆 엘리베이터 탑승"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 1,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 2,
					"mvDst": null,
					"mvContDtl": "2) (B2) 대합실로 이동"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 1,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 3,
					"mvDst": null,
					"mvContDtl": "3) 표 내는 곳 통과"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 1,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 4,
					"mvDst": null,
					"mvContDtl": "4) 승강장 방향 엘리베이터 탑승"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 1,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 5,
					"mvDst": null,
					"mvContDtl": "5) (B3) 충무로 방면 승강장으로 이동"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 1,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 6,
					"mvDst": null,
					"mvContDtl": "6) 승차 (휠체어칸)"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 2,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 1,
					"mvDst": null,
					"mvContDtl": "1) (1F) 6번 출입구 옆 엘리베이터 탑승"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 2,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 2,
					"mvDst": null,
					"mvContDtl": "2) (B2) 대합실로 이동"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 2,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 3,
					"mvDst": null,
					"mvContDtl": "3) 표 내는 곳 통과"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 2,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 4,
					"mvDst": null,
					"mvContDtl": "4) 승강장 방향 엘리베이터 탑승"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 2,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 5,
					"mvDst": null,
					"mvContDtl": "5) (B3) 약수 방면 승강장으로 이동"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 2,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 6,
					"mvDst": null,
					"mvContDtl": "6) 승차 (휠체어칸)"
				}
			]
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

router.get('/ElevatorPos/stinCd/:stinCd/', async (req, res) => {
	try {
		
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		})
	}
})

router.get('/ElevatorMove/stinCd/:stinCd/', async (req, res) => {
	try {
		return res.json({

			"header": {
				"resultCnt": 12,
				"resultCode": "00",
				"resultMsg": "정상 처리되었습니다."
			},
			"body": [
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 1,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 1,
					"mvDst": null,
					"mvContDtl": "1) (1F) 6번 출입구 옆 엘리베이터 탑승"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 1,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 1,
					"mvDst": null,
					"mvContDtl": "1) (1F) 6번 출입구 옆 엘리베이터 탑승"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 2,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 2,
					"mvDst": null,
					"mvContDtl": "2) (B2) 대합실로 이동"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 2,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 2,
					"mvDst": null,
					"mvContDtl": "2) (B2) 대합실로 이동"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 3,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 3,
					"mvDst": null,
					"mvContDtl": "3) 표 내는 곳 통과"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 3,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 3,
					"mvDst": null,
					"mvContDtl": "3) 표 내는 곳 통과"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 4,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 4,
					"mvDst": null,
					"mvContDtl": "4) 승강장 방향 엘리베이터 탑승"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 4,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 4,
					"mvDst": null,
					"mvContDtl": "4) 승강장 방향 엘리베이터 탑승"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 5,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 5,
					"mvDst": null,
					"mvContDtl": "5) (B3) 약수 방면 승강장으로 이동"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 5,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 5,
					"mvDst": null,
					"mvContDtl": "5) (B3) 충무로 방면 승강장으로 이동"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 6,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 6,
					"mvDst": null,
					"mvContDtl": "6) 승차 (휠체어칸)"
				},
				{
					"railOprIsttCd": "S1",
					"lnCd": "3",
					"stinCd": "322",
					"mvPathMgNo": 6,
					"mvPathDvCd": "1",
					"mvPathDvNm": "출입구-승강장",
					"mvTpOrdr": 6,
					"mvDst": null,
					"mvContDtl": "6) 승차 (휠체어칸)"
				}
			]

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

router.get('/transferMove/stinCd/:stinCd', async (req, res) => {
	try {
		return res.json({

			"header": {
				"resultcnt": 12,
				"resultcode": 0,
				"resultmsg": "정상 처리되었습니다."
			},
			"body": {
				"item": [
					{
						"mvpathmgno": 2,
						"chtnmvtpordr": 1,
						"mvcontdtl": "1) (B3) 3호선 을지로3가 방면 승강장 하차",
						"stmovepath": "3호선 을지로3가 방면",
						"edmovepath": "4호선 명동 방면",
						"imgpath": "http://hc.kric.go.kr/hc/ext/images/visual/handicapped/mvPath/S1/S1_3_0563_2_3.png",
						"elvttpcd": {},
						"elvtsttcd": {}
					},
					{
						"mvpathmgno": 2,
						"chtnmvtpordr": 2,
						"mvcontdtl": "2) 대합실 방향 휠체어리프트 탑승",
						"stmovepath": "3호선 을지로3가 방면",
						"edmovepath": "4호선 명동 방면",
						"imgpath": "http://hc.kric.go.kr/hc/ext/images/visual/handicapped/mvPath/S1/S1_3_0563_2_3.png",
						"elvttpcd": {},
						"elvtsttcd": {}
					},
					{
						"mvpathmgno": 2,
						"chtnmvtpordr": 3,
						"mvcontdtl": "3) (B2) 대합실로 이동",
						"stmovepath": "3호선 을지로3가 방면",
						"edmovepath": "4호선 명동 방면",
						"imgpath": "http://hc.kric.go.kr/hc/ext/images/visual/handicapped/mvPath/S1/S1_3_0563_2_3.png",
						"elvttpcd": {},
						"elvtsttcd": {}
					},
					{
						"mvpathmgno": 2,
						"chtnmvtpordr": 4,
						"mvcontdtl": "4) 4호선 명동 방면 엘리베이터 탑승",
						"stmovepath": "3호선 을지로3가 방면",
						"edmovepath": "4호선 명동 방면",
						"imgpath": "http://hc.kric.go.kr/hc/ext/images/visual/handicapped/mvPath/S1/S1_3_0563_2_3.png",
						"elvttpcd": {},
						"elvtsttcd": {}
					},
					{
						"mvpathmgno": 2,
						"chtnmvtpordr": 5,
						"mvcontdtl": "5) (B3) 4호선 명동 방면 승강장으로 이동",
						"stmovepath": "3호선 을지로3가 방면",
						"edmovepath": "4호선 명동 방면",
						"imgpath": "http://hc.kric.go.kr/hc/ext/images/visual/handicapped/mvPath/S1/S1_3_0563_2_3.png",
						"elvttpcd": {},
						"elvtsttcd": {}
					},
					{
						"mvpathmgno": 2,
						"chtnmvtpordr": 6,
						"mvcontdtl": "6) 승차 (휠체어칸)",
						"stmovepath": "3호선 을지로3가 방면",
						"edmovepath": "4호선 명동 방면",
						"imgpath": "http://hc.kric.go.kr/hc/ext/images/visual/handicapped/mvPath/S1/S1_3_0563_2_3.png",
						"elvttpcd": {},
						"elvtsttcd": {}
					},
					{
						"mvpathmgno": 4,
						"chtnmvtpordr": 1,
						"mvcontdtl": "1) (B3) 3호선 동대입구 방면 승강장 하차",
						"stmovepath": "3호선 동대입구 방면",
						"edmovepath": "4호선 명동 방면",
						"imgpath": "http://hc.kric.go.kr/hc/ext/images/visual/handicapped/mvPath/S1/S1_3_0563_4_3.png",
						"elvttpcd": {},
						"elvtsttcd": {}
					},
					{
						"mvpathmgno": 4,
						"chtnmvtpordr": 2,
						"mvcontdtl": "2) 대합실 방향 휠체어리프트 탑승",
						"stmovepath": "3호선 동대입구 방면",
						"edmovepath": "4호선 명동 방면",
						"imgpath": "http://hc.kric.go.kr/hc/ext/images/visual/handicapped/mvPath/S1/S1_3_0563_4_3.png",
						"elvttpcd": {},
						"elvtsttcd": {}
					},
					{
						"mvpathmgno": 4,
						"chtnmvtpordr": 3,
						"mvcontdtl": "3) (B2) 대합실로 이동",
						"stmovepath": "3호선 동대입구 방면",
						"edmovepath": "4호선 명동 방면",
						"imgpath": "http://hc.kric.go.kr/hc/ext/images/visual/handicapped/mvPath/S1/S1_3_0563_4_3.png",
						"elvttpcd": {},
						"elvtsttcd": {}
					},
					{
						"mvpathmgno": 4,
						"chtnmvtpordr": 4,
						"mvcontdtl": "4) 4호선 명동 방면 엘리베이터 탑승",
						"stmovepath": "3호선 동대입구 방면",
						"edmovepath": "4호선 명동 방면",
						"imgpath": "http://hc.kric.go.kr/hc/ext/images/visual/handicapped/mvPath/S1/S1_3_0563_4_3.png",
						"elvttpcd": {},
						"elvtsttcd": {}
					},
					{
						"mvpathmgno": 4,
						"chtnmvtpordr": 5,
						"mvcontdtl": "5) (B3) 4호선 명동 방면 승강장으로 이동",
						"stmovepath": "3호선 동대입구 방면",
						"edmovepath": "4호선 명동 방면",
						"imgpath": "http://hc.kric.go.kr/hc/ext/images/visual/handicapped/mvPath/S1/S1_3_0563_4_3.png",
						"elvttpcd": {},
						"elvtsttcd": {}
					},
					{
						"mvpathmgno": 4,
						"chtnmvtpordr": 6,
						"mvcontdtl": "6) 승차 (휠체어칸)",
						"stmovepath": "3호선 동대입구 방면",
						"edmovepath": "4호선 명동 방면",
						"imgpath": "http://hc.kric.go.kr/hc/ext/images/visual/handicapped/mvPath/S1/S1_3_0563_4_3.png",
						"elvttpcd": {},
						"elvtsttcd": {}
					}
				]
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

router.get('/platformDis/stinCd/:stinCd', async (req, res) => {
	try {

	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		})
	}
})

router.get('/wheelchairPlace/stinCd', async (req, res) => {
	try {

	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		})
	}
})

router.get('/liftRoute/:stCd', async (req, res) => {

})

module.exports = router;