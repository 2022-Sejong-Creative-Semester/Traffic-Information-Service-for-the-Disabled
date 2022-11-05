const serviceKey = require('../Key/serviceKey.json');
const router = require('express').Router();
const request = require('request');
const convert = require('xml-js');

function getSubwayStationName(stNm, callback){
	try{
		
		console.log(stNm);

		const url = 'http://openapi.seoul.go.kr:8088/';
		let queryParams = serviceKey.subwayStNmKey;
		queryParams += '/' + encodeURIComponent('json');
		queryParams += '/' + encodeURIComponent('SearchInfoBySubwayNameService');
		queryParams += '/' + encodeURIComponent('1');
		queryParams += '/' + encodeURIComponent('5');
		queryParams += '/' + encodeURIComponent(stNm) + '/';

		console.log(url+queryParams);

		const tempurl = 'http://openapi.seoul.go.kr:8088/' + serviceKey.subwayStNmKey + '/json/SearchInfoBySubwayNameService/1/5/%EC%A2%85%EB%A1%9C3%EA%B0%80/';
		console.log(url+queryParams);
		console.log(tempurl);
		return request({
			url: url+ queryParams,
			method: 'GET'
		},function(error,response,body){
			console.log(body);
			callback(body);
		});
	}
	catch(e){
		console.error(e);
		callback(e);
	}
}

function getLiftRoute(stCd,callback){
	try{
		
		console.log(stNm);

		const url = 'https://openapi.kric.go.kr/openapi/vulnerableUserInfo/stationWheelchairLiftMovement';
		let queryParams = '?' + encodeURIComponent('serviceKey');
		queryParams += '=' + serviceKey.iiftRouteKey;
		queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
		queryParams += '&' + encodeURIComponent('railOprIsttCd');
		queryParams += '/' + encodeURIComponent('1');
		queryParams += '/' + encodeURIComponent('5');
		queryParams += '/' + encodeURIComponent(stNm) + '/';

		console.log(url+queryParams);

		const tempurl = 'http://openapi.seoul.go.kr:8088/' + serviceKey.subwayStNmKey + '/json/SearchInfoBySubwayNameService/1/5/%EC%A2%85%EB%A1%9C3%EA%B0%80/';
		console.log(url+queryParams);
		console.log(tempurl);
		return request({
			url: url+ queryParams,
			method: 'GET'
		},function(error,response,body){
			console.log(body);
			callback(body);
		});
	}
	catch(e){
		console.error(e);
		callback(e);
	}
}

router.get('/station/subway/:stNm', async (req,res)=>{
	console.log("subway");
	try{
		
		stNm = req.params.stNm;
		await getSubwayStationName(stNm,stationName => {
			return res.json({
				stNm: stationName,
			})
		});
	}
	catch(e){
		console.error(e);
		return res.status(500).json({
			error:e,
			errorString: e.toString(),
		})
	}
})

router.get('/station/subway/liftRoute/:stCd', async (req,res)=>{
	console.log("liftRoute");
	try{
		
		stNm = req.params.stNm;
		await getLiftRoute(stNm,stationName => {
			return res.json({
				stNm: stationName,
			})
		});
	}
	catch(e){
		console.error(e);
		return res.status(500).json({
			error:e,
			errorString: e.toString(),
		})
	}
})

module.exports = router;