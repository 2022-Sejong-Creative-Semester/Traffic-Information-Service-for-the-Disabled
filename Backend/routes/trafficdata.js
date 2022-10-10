const router = require('express').Router();
const request = require('request');
const convert = require('xml-js');

//request 사용
//GET 형식이므로 method 사용 X
function getTraffic(callback){
	
	/*
	//서울 버스 정보
	const options = {
		uri: 'http://ws.bus.go.kr/api/rest/buspos/getBusPosByRtid',
		//method: 'GET'
		serviceKey: 'e9On5lcUn1B34BdjVckQEjxzkUWt66cSHkSSlRTp5KKW4zyEdU3z15GSHyw56KS4Uz6mcvtZjOP9I4Kq%2BMu5kQ%3D%3D',
		//serviceKey: 'v54lopIOulwQggh%2BDf7dCXIQ2hCXuaVzQUQ76ZyUx6kPPCMAduNDhOScQKLqA1gAru2%2FSS%2FMTPhtWmYodBSCnA%3D%3D',
		busRouteId: '100100118'
	};

	request(options,function(err,response,body){
		console.log(body);	
	//callback(body);
	});
	*/
	
	
	const url = "http://ws.bus.go.kr/api/rest/buspos/getBusPosByRouteSt?serviceKey=e9On5lcUn1B34BdjVckQEjxzkUWt66cSHkSSlRTp5KKW4zyEdU3z15GSHyw56KS4Uz6mcvtZjOP9I4Kq%2BMu5kQ%3D%3D&busRouteId=100100118&startOrd=1&endOrd=13"

	request({url:url},(err,response,body)=>{
		console.log(body);
	})
	
	/*
	let url = 'http://ws.bus.go.kr/api/rest/buspos/getBusPosByRouteSt';
	let queryParams = '?' + encodeURIComponent('serviceKey') + '=e9On5lcUn1B34BdjVckQEjxzkUWt66cSHkSSlRTp5KKW4zyEdU3z15GSHyw56KS4Uz6mcvtZjOP9I4Kq%2BMu5kQ%3D%3D'; 
	queryParams += '&' + encodeURIComponent('busRouteId') + '=' + encodeURIComponent('100100118'); 
	queryParams += '&' + encodeURIComponent('startOrd') + '=' + encodeURIComponent('1'); 
	queryParams += '&' + encodeURIComponent('endOrd') + '=' + encodeURIComponent('10'); 

	request({
		url: url + queryParams,
		method: 'GET'
	}, function (error, response, body) {
		//console.log('Status', response.statusCode);
		//console.log('Headers', JSON.stringify(response.headers));
		console.log('Reponse received', body);
	});
	*/
}


/*
function getTraffic(callback){
	
	const url = 'http://ws.bus.go.kr/api/rest/buspos/getBusPosByRouteSt';
	
	//Encoded Key
	let queryParams = '?' + encodeURIComponent('serviceKey') + '=e9On5lcUn1B34BdjVckQEjxzkUWt66cSHkSSlRTp5KKW4zyEdU3z15GSHyw56KS4Uz6mcvtZjOP9I4Kq%2BMu5kQ%3D%3D'; //Service Key 
	//Decoded Key
	//let queryParams = '?' + encodeURIComponent('serviceKey') + '=e9On5lcUn1B34BdjVckQEjxzkUWt66cSHkSSlRTp5KKW4zyEdU3z15GSHyw56KS4Uz6mcvtZjOP9I4Kq+Mu5kQ=='; // Service Key 
	queryParams += '&' + encodeURIComponent('busRouteId') + '=' + encodeURIComponent('100100118'); 
	queryParams += '&' + encodeURIComponent('startOrd') + '=' + encodeURIComponent('1'); 
	queryParams += '&' + encodeURIComponent('endOrd') + '=' + encodeURIComponent('10');

	console.log(url + queryParams);

	request({
		url: url + queryParams,
		method: 'GET'
	}, function (error, response, body) {
		//console.log('url', url+queryParams);
		//console.log('Status', response.statusCode);
		//console.log('Headers', JSON.stringify(response.headers));
		console.log('Reponse received', body);
	});

}
*/

function getStation(stNm,callback){	
	const url = 'http://ws.bus.go.kr/api/rest/stationinfo/getStationByName';
	let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'e9On5lcUn1B34BdjVckQEjxzkUWt66cSHkSSlRTp5KKW4zyEdU3z15GSHyw56KS4Uz6mcvtZjOP9I4Kq%2BMu5kQ%3D%3D';
	queryParams += '&' + encodeURIComponent('stSrch') + '=' + encodeURIComponent(stNm);
	//console.log(url+queryParams);
	//let StationList = [];
	
	return request({
		url: url + queryParams,
		method: 'GET'
	}, function (error, response, body) {
		//console.log('Reponse received', body);
		const stationinfo = convert.xml2json(body);
		
		//console.log('Json', stationinfo);
		console.log(stationinfo);
		callback(stationinfo);
	});

}

router.get('/traffic' , async(req,res) =>{
	await getTraffic();

	return res.json({
		text: "why"
	})
})

router.get('/station', async(req,res)=>{
	
	//const stNm = req.params.stNm;
	console.log("station");
	await getStation("세종대", station => {
	//console.log(station);
		return res.json(station);
	})
	
})

router.get('/station/:stNm', async(req,res)=>{
	
	const stNm = req.params.stNm;
	console.log("station");
	await getStation(stNm, station => {
	//console.log(station);
		return res.json(station);
	})
	
})

module.exports = router;
