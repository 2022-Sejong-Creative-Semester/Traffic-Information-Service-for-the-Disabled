/* NodeJs 12 »ùÇÃ ÄÚµå */


const request = require('request');

let url = 'http://ws.bus.go.kr/api/rest/buspos/getBusPosByRouteSt';
let queryParams = '?' + encodeURIComponent('serviceKey') + '=e9On5lcUn1B34BdjVckQEjxzkUWt66cSHkSSlRTp5KKW4zyEdU3z15GSHyw56KS4Uz6mcvtZjOP9I4Kq%2BMu5kQ%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('busRouteId') + '=' + encodeURIComponent('100100118'); /* */
queryParams += '&' + encodeURIComponent('startOrd') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('endOrd') + '=' + encodeURIComponent('10'); /* */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
});