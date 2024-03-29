﻿const router = require('express').Router();
const request = require('request');
const convert = require('xml-js');
const serviceKey = require('../KEY/serviceKey.json');

function getStation(stNm, callback) {
	try {
		const url = 'http://ws.bus.go.kr/api/rest/stationinfo/getLowStationByName';
		let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey.serviceKey;
		queryParams += '&' + encodeURIComponent('stSrch') + '=' + encodeURIComponent(stNm);
		//console.log(url+queryParams);
		//let StationList = [];

		return request({
			url: url + queryParams,
			method: 'GET'
		}, function (error, response, body) {

			//console.log('Reponse received', body);

			const parseJson = convert.xml2json(body);
			const stationinfo = JSON.parse(parseJson).elements[0].elements[2];

			//이 라인과 아래만 삭제하면 됨
			//console.log(stationinfo);
			console.log(stationinfo.elements[0].elements[0]);

			if (stationinfo.elements === undefined) {
				callback(0);
			}

			else {
				const stationlength = stationinfo.elements.length;
				//console.log(stationinfo.elements[0]);
				let stationRes = [];

				for (let i = 0; i < stationlength; i++) {
					//arsId가 0인 경우 처리
					const arsId = stationinfo.elements[i].elements[0].elements[0].text;
					const stId = stationinfo.elements[i].elements[3].elements[0].text;
					const stNm = stationinfo.elements[i].elements[4].elements[0].text;
					const tmX = stationinfo.elements[i].elements[5].elements[0].text;
					const tmY = stationinfo.elements[i].elements[6].elements[0].text;
					stationRes.push({
						arsId: arsId,
						stId: stId,
						stNm: stNm,
						tmX: tmX,
						tmY: tmY,
					})
				}

				//console.log('Json', stationinfo);
				//console.log(stationinfo.elements[0].elements[2]);
				callback(stationRes);
			}

		});
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		});
	}


}

function getStationInfo(arsId, callback) {

	try {
		const url = 'http://ws.bus.go.kr/api/rest/stationinfo/getLowStationByUid';
		let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey.serviceKey;
		queryParams += '&' + encodeURIComponent('arsId') + '=' + arsId;

		return request({
			url: url + queryParams,
			method: 'GET'
		}, function (error, response, body) {

			const parseJson = convert.xml2json(body);
			const stationinfo = JSON.parse(parseJson).elements[0].elements[2];

			console.log(stationinfo.elements[0]);

			if (stationinfo.elements == null) {
				callback(0);
			}

			else {
				const buslength = stationinfo.elements.length;

				

				let busInfo = [];

				for (let i = 0; i < buslength; i++) {
					//console.log(stationinfo.elements[i]);
					const adirection = stationinfo.elements[i].elements[0].elements[0].text;
					const arrmsg1 = stationinfo.elements[i].elements[1].elements[0].text;
					const busrouteAbrv = stationinfo.elements[i].elements[4].elements[0].text;
					const busrouteid = stationinfo.elements[i].elements[5].elements[0].text;
					const bustype = stationinfo.elements[i].elements[6].elements[0].text;
					const nxtStn = stationinfo.elements[i].elements[22].elements[0].text;
					
					
					let min = "";
					let sec = "";

					let subtime = arrmsg1;
					//[첫차] or [막차] 인 경우
					if (subtime[0] == "[") {
						subtime = subtime.substr(6,);
					}
					
					//분 없는 경우
					//초 없는 경우

					if (subtime != "운행종료" && subtime != "곧 도착") {
						//console.log(subtime.split("분"));

						let msgSplit = [];
						
						if (subtime.indexOf("분") != -1) {
							msgSplit = subtime.split("분");
							min = msgSplit[0];
							if (subtime.indexOf("초") != -1) {
								sec = msgSplit[1].split("초")[0];
							}
						}
						else {
							sec = subtime.split("초")[0];
						}
					}
					
					busInfo.push({
						busrouteid: busrouteid,
						busrouteAbrv: busrouteAbrv,
						bustype: bustype,
						adirection: adirection,
						nxtStn: nxtStn,
						arrmsg1: arrmsg1,
						min: min,
						sec: sec,
					})
				}

				//console.log(stationinfo);

				callback(busInfo);
			}
			//callback(stationinfo);

		});
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		});
	}

}

router.get('/stNm/:stNm', async (req, res) => {

	console.log('stationName');

	try {
		const stNm = req.params.stNm;
		//console.log("station");
		await getStation(stNm, station => {
			//console.log(station);
			if (station == 0) {
				return res.status(404).json({
					error: 'No stops with that name'
				})
			}
			return res.json(station);
		})
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		});
	}

})

router.get('/arsId/:arsId', async (req, res) => {

	console.log('arsId');

	const arsId = req.params.arsId;
	//console.log("station");
	try {
		await getStationInfo(arsId, stationinfo => {
			//console.log(station);
			if (stationinfo == 0) {
				return res.status(404).json({
					error: 'No Bus In Station'
				})
			}
			else{
				//console.log(new Date());
				return res.json(stationinfo);
			}

		});
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		});
	};

})

module.exports = router;