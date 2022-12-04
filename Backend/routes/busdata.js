const router = require('express').Router();
const request = require('request');
const convert = require('xml-js');
const serviceKey = require('../Key/serviceKey.json');

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

			if (stationinfo.elements == null) {
				callback(0);
			}

			else {
				const stationlength = stationinfo.elements.length;
				//console.log(stationinfo.elements[0]);
				let stationRes = [];

				for (let i = 0; i < stationlength; i++) {
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

			console.log(stationinfo);

			if (stationinfo.elements == null) {
				callback(0);
			}

			else {
				const buslength = stationinfo.elements.length;

				let busInfo = [];

				for (let i = 0; i < buslength; i++) {
					const busrouteid = stationinfo.elements[i].elements[5].elements[0].text;
					const busrouteAbrv = stationinfo.elements[i].elements[4].elements[0].text;
					const bustype = stationinfo.elements[i].elements[6].elements[0].text;
					const adirection = stationinfo.elements[i].elements[0].elements[0].text;
					const congestion = stationinfo.elements[i].elements[9].elements[0].text;
					const nxtStn = stationinfo.elements[i].elements[22].elements[0].text;
					const arrmsg1 = stationinfo.elements[i].elements[1].elements[0].text;

					let min = "";
					let sec = "";

					if (arrmsg1 != "운행종료") {
						//min, sec
						//min
						//sec
						const msgSplit = arrmsg1.split("분");
						min = msgSplit[0];
						sec = msgSplit[1].split("초")[0];
					}

					//console.log(min);
					//console.log(sec);
					
					busInfo.push({
						busrouteid: busrouteid,
						busrouteAbrv: busrouteAbrv,
						bustype: bustype,
						adirection: adirection,
						congestion: congestion,
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
			else
				return res.json(stationinfo);
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