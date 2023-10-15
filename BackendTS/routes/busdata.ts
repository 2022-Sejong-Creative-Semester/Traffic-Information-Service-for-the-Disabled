import express, {Request, Response, Router} from 'express'
import request from 'request'
import convert from 'xml-js'
import serviceKey from '../Key/serviceKey.json'
import {BusInfo, BusInfoList, BusItemList, BusStationInfo, BusStationList} from '../../interfaces/Bus/bus.interface'

const router:Router = express.Router();

function getStation(stNm:string, callback:(stationinfo: Array<BusStationInfo>)=>void) {
	try {
		const url:string = 'http://ws.bus.go.kr/api/rest/stationinfo/getLowStationByName';
		let queryParams:string = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey.serviceKey;
		queryParams += '&' + encodeURIComponent('stSrch') + '=' + encodeURIComponent(stNm);

		return request({
			url: url + queryParams,
			method: 'GET'
		}, function (error:Error, response:any, body:string) {

			const parseJson:string = convert.xml2json(body);
			const stationinfo:BusStationList = JSON.parse(parseJson).elements[0].elements[2];

			//빈 배열 선언
			const stationRes:Array<BusStationInfo> = [];

			//정류장이 없는 경우 빈 배열 반환
			if (stationinfo.elements === undefined) {
				callback(stationRes);
			}
			else {
				const stationlength:number = stationinfo.elements.length;				

				for (let i = 0; i < stationlength; i++) {
					//arsId가 0인 경우 처리
					const arsId:string = stationinfo.elements[i].elements[0].elements[0].text;
					const stId:string = stationinfo.elements[i].elements[3].elements[0].text;
					const stNm:string = stationinfo.elements[i].elements[4].elements[0].text;
					const tmX:string = stationinfo.elements[i].elements[5].elements[0].text;
					const tmY:string = stationinfo.elements[i].elements[6].elements[0].text;
					stationRes.push({
						arsId: arsId,
						stId: stId,
						stNm: stNm,
						tmX: tmX,
						tmY: tmY,
					})
				}

				callback(stationRes);
			}

		});
	}
	catch (e) {
		console.error(e);
	}


}

function getStationInfo(arsId:string, callback:(busInfo: Array<BusInfo>)=>void) {

	try {
		const url:string = 'http://ws.bus.go.kr/api/rest/stationinfo/getLowStationByUid';
		let queryParams:string = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey.serviceKey;
		queryParams += '&' + encodeURIComponent('arsId') + '=' + arsId;

		return request({
			url: url + queryParams,
			method: 'GET'
		}, function (error:Error, response:any, body:string) {

			const parseJson:string = convert.xml2json(body);
			const stationinfo:BusItemList = JSON.parse(parseJson).elements[0].elements[2];

			const busInfo:Array<BusInfo> = [];

			if (stationinfo.elements === undefined) {
				callback(busInfo);
			}

			else {
				const buslength:number = stationinfo.elements.length;

				for (let i = 0; i < buslength; i++) {
					const adirection:string = stationinfo.elements[i].elements[0].elements[0].text;
					const arrmsg1:string = stationinfo.elements[i].elements[1].elements[0].text;
					const busrouteAbrv:string = stationinfo.elements[i].elements[4].elements[0].text;
					const busrouteid:string = stationinfo.elements[i].elements[5].elements[0].text;
					const bustype:string = stationinfo.elements[i].elements[6].elements[0].text;
					const nxtStn:string = stationinfo.elements[i].elements[22].elements[0].text;
					
					
					let min:string = "";
					let sec:string = "";

					let subtime:string = arrmsg1;

					/*
					//[첫차] or [막차] 인 경우
					if (subtime[0] == "[") {
						subtime = subtime.substr(6,);
					}
					*/

					//분 없는 경우
					//초 없는 경우

					if (subtime != "운행종료" && subtime != "곧 도착") {
						let msgSplit:Array<string> = [];
						
						if (subtime.indexOf("분") !== -1) {
							msgSplit = subtime.split("분");
							min = msgSplit[0];
							if (subtime.indexOf("초") !== -1) {
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

				callback(busInfo);
			}
		});
	}
	catch (e) {
		console.error(e);
	}

}

//버스 정류장 이름으로 검색하기
router.get('/stNm/:stNm', async (req:Request, res:Response) => {

	try {
		const stNm:string = req.params.stNm;

		await getStation(stNm, station => {

			if (station.length === 0) {
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

//정류소 아이디로 정보 제공
router.get('/arsId/:arsId', async (req:Request, res:Response) => {

	const arsId:string = req.params.arsId;

	try {
		await getStationInfo(arsId, stationinfo => {
			
			if (stationinfo.length === 0) {
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

export = router;