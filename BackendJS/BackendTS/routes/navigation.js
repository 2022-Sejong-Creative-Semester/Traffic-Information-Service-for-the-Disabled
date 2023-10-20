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
                const restruct = () => __awaiter(this, void 0, void 0, function* () {
                    return new Promise((res, rej) => {
                    });
                });
                const navigationInfo = JSON.parse(parseJSON).elements[0].elements[2].elements;
                /*
                //정렬 기준 (1. 환승 경로 개수 / 2. 이동 시간)
                navigationInfo.sort((a:itemList,b:itemList)=>{
                  
                  if( a.elements.pathList.elements.length === b.elements.pathList.elements.length){
                    return parseInt(a.elements.time.elements[0].text) - parseInt(b.elements.time.elements[0].text);
                  }
                  
                  return a.elements.pathList.elements.length - b.elements.pathList.elements.length
                })
                */
                console.log(navigationInfo);
                return res.status(200).json({
                    body: navigationInfo
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
router.get('/bysubway', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
router.get('/bybusNsubway', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
module.exports = router;
