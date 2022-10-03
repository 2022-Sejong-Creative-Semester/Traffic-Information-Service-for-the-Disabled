const router = require('express').Router();
const request = require('request');

//request 사용
//GET 형식이므로 method 사용 X
function getTraffic(callback){
	
	const url = 'http://ws.bus.go.kr/api/rest/buspos/getBusPosByRouteSt';
	
	/*Encoded Key*/
	let queryParams = '?' + encodeURIComponent('serviceKey') + '=e9On5lcUn1B34BdjVckQEjxzkUWt66cSHkSSlRTp5KKW4zyEdU3z15GSHyw56KS4Uz6mcvtZjOP9I4Kq%2BMu5kQ%3D%3D'; /* Service Key*/ 
	/*Decoded Key*/
	/*let queryParams = '?' + encodeURIComponent('serviceKey') + '=e9On5lcUn1B34BdjVckQEjxzkUWt66cSHkSSlRTp5KKW4zyEdU3z15GSHyw56KS4Uz6mcvtZjOP9I4Kq+Mu5kQ==';*/ /* Service Key*/ 
	queryParams += '&' + encodeURIComponent('busRouteId') + '=' + encodeURIComponent('100100118'); /* */
	queryParams += '&' + encodeURIComponent('startOrd') + '=' + encodeURIComponent('1'); /* */
	queryParams += '&' + encodeURIComponent('endOrd') + '=' + encodeURIComponent('10'); /* */

	console.log(url+queryParams);

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

router.get('/traffic1' , async(req,res) =>{
	getTraffic();
	return res.json({
		text: "why"
	})
})

module.exports = router;
