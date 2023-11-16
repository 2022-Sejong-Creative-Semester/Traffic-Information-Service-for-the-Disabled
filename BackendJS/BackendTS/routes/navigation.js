"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const request_1 = __importDefault(require("request"));
const xml_js_1 = __importDefault(require("xml-js"));
const serviceKey_json_1 = __importDefault(require("../KEY/serviceKey.json"));
const router = express_1.default.Router();
const velocity = 0.0468;
function deg2rad(deg) {
    return (deg * Math.PI / 180);
}
function rad2deg(rad) {
    return (rad * 180 / Math.PI);
}
function distance(lat1, lon1, lat2, lon2) {
    if (lat1 === lat2 && lon1 == lon2) {
        return 0;
    }
    else {
        let theta = lon1 - lon2;
        let dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        //dist를 지름으로 한 원 내부의 직각삼각형 두 변의 길이
        return dist * Math.sqrt(2);
    }
}
router.get('/bybus/:startX/:startY/:endX/:endY', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startX = req.params.startX;
        const startY = req.params.startY;
        const endX = req.params.endX;
        const endY = req.params.endY;
        const url = "http://ws.bus.go.kr/api/rest/pathinfo/getPathInfoByBus";
        let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey_json_1.default.serviceKey;
        queryParams += '&' + encodeURIComponent('startX') + '=' + startX;
        queryParams += '&' + encodeURIComponent('startY') + '=' + startY;
        queryParams += '&' + encodeURIComponent('endX') + '=' + endX;
        queryParams += '&' + encodeURIComponent('endY') + '=' + endY;
        (0, request_1.default)({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            return __awaiter(this, void 0, void 0, function* () {
                const parseJSON = xml_js_1.default.xml2json(body);
                const navigationList = JSON.parse(parseJSON).elements[0].elements[2].elements;
                const navigationInfo = [];
                navigationList.forEach((info) => {
                    const tempInfo = {
                        distance: "",
                        pathList: [],
                        timeList: [],
                        totalTime: "",
                        walkTime: 0, //총 도보 이동 시간
                    };
                    tempInfo.distance = info.elements[0].elements[0].text;
                    tempInfo.totalTime = info.elements[2].elements[0].text;
                    //첫 출발지랑 정류장/역 사이 거리
                    let x1 = Number(startX);
                    let y1 = Number(startY);
                    let x2 = Number(info.elements[1].elements[2].elements[0].text);
                    let y2 = Number(info.elements[1].elements[3].elements[0].text);
                    let dist = distance(x1, y1, x2, y2);
                    tempInfo.timeList.push(Math.floor(dist / velocity));
                    tempInfo.walkTime += Math.floor(dist / velocity);
                    for (let i = 0; i < info.elements[1].elements.length / 10; i++) {
                        tempInfo.pathList.push({
                            fid: info.elements[1].elements[i % 10].elements[0].text,
                            fname: info.elements[1].elements[i % 10 + 1].elements[0].text,
                            fx: info.elements[1].elements[i % 10 + 2].elements[0].text,
                            fy: info.elements[1].elements[i % 10 + 3].elements[0].text,
                            routeId: info.elements[1].elements[i % 10 + 4].elements[0].text,
                            routeNm: info.elements[1].elements[i % 10 + 5].elements[0].text,
                            tid: info.elements[1].elements[i % 10 + 6].elements[0].text,
                            tname: info.elements[1].elements[i % 10 + 7].elements[0].text,
                            tx: info.elements[1].elements[i % 10 + 8].elements[0].text,
                            ty: info.elements[1].elements[i % 10 + 9].elements[0].text,
                        });
                        //마지막 정류장/역과 목적지 사이 도보 이동거리
                        x1 = Number(info.elements[1].elements[i % 10 + 2].elements[0].text);
                        y1 = Number(info.elements[1].elements[i % 10 + 3].elements[0].text);
                        x2 = Number(info.elements[1].elements[i % 10 + 8].elements[0].text);
                        y2 = Number(info.elements[1].elements[i % 10 + 9].elements[0].text);
                        dist = distance(x1, y1, x2, y2);
                        tempInfo.timeList.push(Math.floor(dist / velocity));
                        tempInfo.walkTime += Math.floor(dist / velocity);
                    }
                    //마지막 정류장/역과 목적지 사이 도보 이동거리
                    x1 = Number(endX);
                    y1 = Number(endY);
                    x2 = Number(info.elements[1].elements[info.elements[1].elements.length - 2].elements[0].text);
                    y2 = Number(info.elements[1].elements[info.elements[1].elements.length - 1].elements[0].text);
                    dist = distance(x1, y1, x2, y2);
                    tempInfo.timeList.push(Math.floor(dist / velocity));
                    tempInfo.walkTime += Math.floor(dist / velocity);
                    navigationInfo.push(tempInfo);
                });
                //정렬 기준 (1. 환승 경로 개수 / 2. 이동 시간)
                navigationInfo.sort((a, b) => {
                    if (a.pathList.length === b.pathList.length) {
                        return a.walkTime - b.walkTime;
                    }
                    return a.pathList.length - b.pathList.length;
                });
                return res.status(200).json({
                    navigationInfo: navigationInfo
                });
            });
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({
            error: e,
            errorString: e.toString(),
        });
    }
}));
router.get('/bysubway/:startX/:startY/:endX/:endY', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //지하철 환승 이동 시간 필요
        const startX = req.params.startX;
        const startY = req.params.startY;
        const endX = req.params.endX;
        const endY = req.params.endY;
        const url = "http://ws.bus.go.kr/api/rest/pathinfo/getPathInfoBySubway";
        let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey_json_1.default.serviceKey;
        queryParams += '&' + encodeURIComponent('startX') + '=' + startX;
        queryParams += '&' + encodeURIComponent('startY') + '=' + startY;
        queryParams += '&' + encodeURIComponent('endX') + '=' + endX;
        queryParams += '&' + encodeURIComponent('endY') + '=' + endY;
        (0, request_1.default)({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            return __awaiter(this, void 0, void 0, function* () {
                const parseJSON = xml_js_1.default.xml2json(body);
                const navigationList = JSON.parse(parseJSON).elements[0].elements[2].elements;
                const navigationInfo = [];
                navigationList.forEach((info) => {
                    const tempInfo = {
                        distance: "",
                        pathList: [],
                        timeList: [],
                        totalTime: "",
                        walkTime: 0, //총 도보 이동 시간
                    };
                    tempInfo.distance = info.elements[0].elements[0].text;
                    tempInfo.totalTime = info.elements[2].elements[0].text;
                    //첫 출발지랑 정류장/역 사이 거리
                    let x1 = Number(startX);
                    let y1 = Number(startY);
                    let x2 = Number(info.elements[1].elements[2].elements[0].text);
                    let y2 = Number(info.elements[1].elements[3].elements[0].text);
                    let dist = distance(x1, y1, x2, y2);
                    tempInfo.timeList.push(Math.floor(dist / velocity));
                    tempInfo.walkTime += Math.floor(dist / velocity);
                    for (let i = 0; i < info.elements[1].elements.length / 10; i++) {
                        const railLinkList = [];
                        console.log(JSON.stringify(info.elements[1].elements));
                        for (let j = 0; j < info.elements[1].elements[i % 10 + 4].elements.length; j++) {
                            railLinkList.push(info.elements[1].elements[i % 10 + 4].elements[j].text);
                        }
                        tempInfo.pathList.push({
                            fid: info.elements[1].elements[i % 10].elements[0].text,
                            fname: info.elements[1].elements[i % 10 + 1].elements[0].text,
                            fx: info.elements[1].elements[i % 10 + 2].elements[0].text,
                            fy: info.elements[1].elements[i % 10 + 3].elements[0].text,
                            railLinkList: railLinkList,
                            routeNm: info.elements[1].elements[i % 10 + 5].elements[0].text,
                            tid: info.elements[1].elements[i % 10 + 6].elements[0].text,
                            tname: info.elements[1].elements[i % 10 + 7].elements[0].text,
                            tx: info.elements[1].elements[i % 10 + 8].elements[0].text,
                            ty: info.elements[1].elements[i % 10 + 9].elements[0].text
                        });
                        //마지막 정류장/역과 목적지 사이 도보 이동거리
                        x1 = Number(info.elements[1].elements[i % 10 + 2].elements[0].text);
                        y1 = Number(info.elements[1].elements[i % 10 + 3].elements[0].text);
                        x2 = Number(info.elements[1].elements[i % 10 + 8].elements[0].text);
                        y2 = Number(info.elements[1].elements[i % 10 + 9].elements[0].text);
                        dist = distance(x1, y1, x2, y2);
                        tempInfo.timeList.push(Math.floor(dist / velocity));
                        tempInfo.walkTime += Math.floor(dist / velocity);
                    }
                    //마지막 정류장/역과 목적지 사이 도보 이동거리
                    x1 = Number(endX);
                    y1 = Number(endY);
                    x2 = Number(info.elements[1].elements[info.elements[1].elements.length - 2].elements[0].text);
                    y2 = Number(info.elements[1].elements[info.elements[1].elements.length - 1].elements[0].text);
                    dist = distance(x1, y1, x2, y2);
                    tempInfo.timeList.push(Math.floor(dist / velocity));
                    tempInfo.walkTime += Math.floor(dist / velocity);
                    navigationInfo.push(tempInfo);
                });
                //정렬 기준 (1. 환승 경로 개수 / 2. 이동 시간)
                navigationInfo.sort((a, b) => {
                    if (a.pathList.length === b.pathList.length) {
                        return a.walkTime - b.walkTime;
                    }
                    return a.pathList.length - b.pathList.length;
                });
                return res.status(200).json({
                    navigationInfo: navigationInfo
                });
            });
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({
            error: e,
            errorString: e.toString(),
        });
    }
}));
router.get('/bybusNsubway/:startX/:startY/:endX/:endY', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //버스 -> 지하철 / 지하철 -> 버스로 이동하는 시간 고려
    try {
        //지하철 환승 이동 시간 필요
        const startX = req.params.startX;
        const startY = req.params.startY;
        const endX = req.params.endX;
        const endY = req.params.endY;
        const url = "http://ws.bus.go.kr/api/rest/pathinfo/getPathInfoByBusNSub";
        let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + serviceKey_json_1.default.serviceKey;
        queryParams += '&' + encodeURIComponent('startX') + '=' + startX;
        queryParams += '&' + encodeURIComponent('startY') + '=' + startY;
        queryParams += '&' + encodeURIComponent('endX') + '=' + endX;
        queryParams += '&' + encodeURIComponent('endY') + '=' + endY;
        (0, request_1.default)({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            return __awaiter(this, void 0, void 0, function* () {
                const parseJSON = xml_js_1.default.xml2json(body);
                const navigationList = JSON.parse(parseJSON).elements[0].elements[2].elements;
                const navigationInfo = [];
                navigationList.forEach((info) => {
                    const tempInfo = {
                        distance: "",
                        pathList: [],
                        timeList: [],
                        totalTime: "",
                        walkTime: 0, //총 도보 이동 시간
                    };
                    tempInfo.distance = info.elements[0].elements[0].text;
                    tempInfo.totalTime = info.elements[2].elements[0].text;
                    //첫 출발지랑 정류장/역 사이 거리
                    let x1 = Number(startX);
                    let y1 = Number(startY);
                    let x2 = Number(info.elements[1].elements[2].elements[0].text);
                    let y2 = Number(info.elements[1].elements[3].elements[0].text);
                    let dist = distance(x1, y1, x2, y2);
                    tempInfo.timeList.push(Math.floor(dist / velocity));
                    tempInfo.walkTime += Math.floor(dist / velocity);
                    for (let i = 0; i < info.elements[1].elements.length / 10; i++) {
                        tempInfo.pathList.push({
                            fid: info.elements[1].elements[i % 10].elements[0].text,
                            fname: info.elements[1].elements[i % 10 + 1].elements[0].text,
                            fx: info.elements[1].elements[i % 10 + 2].elements[0].text,
                            fy: info.elements[1].elements[i % 10 + 3].elements[0].text,
                            routeId: info.elements[1].elements[i % 10 + 4].elements[0].text,
                            routeNm: info.elements[1].elements[i % 10 + 5].elements[0].text,
                            tid: info.elements[1].elements[i % 10 + 6].elements[0].text,
                            tname: info.elements[1].elements[i % 10 + 7].elements[0].text,
                            tx: info.elements[1].elements[i % 10 + 8].elements[0].text,
                            ty: info.elements[1].elements[i % 10 + 9].elements[0].text,
                        });
                        //마지막 정류장/역과 목적지 사이 도보 이동거리
                        x1 = Number(info.elements[1].elements[i % 10 + 2].elements[0].text);
                        y1 = Number(info.elements[1].elements[i % 10 + 3].elements[0].text);
                        x2 = Number(info.elements[1].elements[i % 10 + 8].elements[0].text);
                        y2 = Number(info.elements[1].elements[i % 10 + 9].elements[0].text);
                        dist = distance(x1, y1, x2, y2);
                        tempInfo.timeList.push(Math.floor(dist / velocity));
                        tempInfo.walkTime += Math.floor(dist / velocity);
                    }
                    //마지막 정류장/역과 목적지 사이 도보 이동거리
                    x1 = Number(endX);
                    y1 = Number(endY);
                    x2 = Number(info.elements[1].elements[info.elements[1].elements.length - 2].elements[0].text);
                    y2 = Number(info.elements[1].elements[info.elements[1].elements.length - 1].elements[0].text);
                    dist = distance(x1, y1, x2, y2);
                    tempInfo.timeList.push(Math.floor(dist / velocity));
                    tempInfo.walkTime += Math.floor(dist / velocity);
                    navigationInfo.push(tempInfo);
                });
                //정렬 기준 (1. 환승 경로 개수 / 2. 이동 시간)
                navigationInfo.sort((a, b) => {
                    if (a.pathList.length === b.pathList.length) {
                        return a.walkTime - b.walkTime;
                    }
                    return a.pathList.length - b.pathList.length;
                });
                return res.status(200).json({
                    navigationInfo: navigationInfo
                });
            });
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({
            error: e,
            errorString: e.toString(),
        });
    }
}));
module.exports = router;
