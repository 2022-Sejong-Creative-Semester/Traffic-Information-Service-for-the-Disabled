const router = require('express').Router();
const request = require('request');
const convert = require('xml-js');
const serviceKey = require('../Key/serviceKey.json');
//const gpsdata = require('../routes/GPS.json');

//request 사용
//GET 형식이므로 method 사용 X
function getTraffic(callback) {

	const url = "http://ws.bus.go.kr/api/rest/buspos/getBusPosByRouteSt?serviceKey=" + serviceKey.serviceKey + "&busRouteId=100100118&startOrd=1&endOrd=13"

	return request({ url: url }, (err, response, body) => {
		console.log(body);
		callback(body);
	})
}

function getStation(stNm, callback) {
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
		//console.log('Json', stationinfo);
		//console.log(stationinfo.elements[0].elements[2]);
		callback(stationinfo);
	});

}

function getStationInfo(arsId,callback){
	const url = 'http://ws.bus.go.kr/api/rest/stationinfo/getLowStationByUid';
	let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey.serviceKey;
	queryParams += '&' + encodeURIComponent('arsId') + '=' + arsId;



	return request({
		url: url + queryParams,
		method: 'GET'

	}, function(error,response,body){
		//console.log(url + queryParams);
		//console.log(body);
		const parseJson = convert.xml2json(body);
		const stationinfo = JSON.parse(parseJson).elements[0].elements[2];
		
		const buslength = stationinfo.elements.length;

		let busInfo = [];

		for(let i = 0; i < buslength; i++){
			const busrouteid = stationinfo.elements[i].elements[5].elements[0].text;
			const busrouteAbrv = stationinfo.elements[i].elements[4].elements[0].text;
			const bustype = stationinfo.elements[i].elements[6].elements[0].text;
			const adirection = stationinfo.elements[i].elements[0].elements[0].text;
			const congestion = stationinfo.elements[i].elements[9].elements[0].text;
			const nxtStn = stationinfo.elements[i].elements[22].elements[0].text;
			const arrmsg1 = stationinfo.elements[i].elements[1].elements[0].text;
			
			busInfo.push({
				busrouteid: busrouteid,
				busrouteAbrv: busrouteAbrv,
				bustype: bustype,
				adirection: adirection,
				congestion: congestion,
				nxtStn: nxtStn,
				arrmsg1: arrmsg1,
			})
		}

		//console.log(stationinfo);
		callback(busInfo);
	});
}


router.get('/traffic', async (req, res) => {
	await getTraffic();

	return res.json({
		text: "why"
	})
})

/*
router.get('/station', async (req, res) => {

	
	const stNm = req.params.stNm;
	console.log(stNm);
	await getStation("세종대", station => {
		//console.log(station);
		return res.json(station);
	})
	
})
*/

router.get('/station/:stNm', async (req, res) => {

	const stNm = req.params.stNm;
	//console.log("station");
	await getStation(stNm, station => {
		//console.log(station);
		return res.json(station);
	})

})


/*
router.get('/stationInfo', async (req, res) => {

	//const stNm = req.params.stNm;
	console.log("stationInfo");
	await getStationInfo('05251', station => {
		//console.log(station);
		return res.json(station);
	})
})
*/

router.get('/stationInfo/:arsId', async (req, res) => {

	const arsId = req.params.arsId;
	//console.log("station");
	await getStationInfo(arsId, stationinfo => {
		//console.log(station);
		return res.json(stationinfo);
	});
})

router.get('/GPS',async (req,res)=>{
	return res.json(gpsdata);
})

module.exports = router;