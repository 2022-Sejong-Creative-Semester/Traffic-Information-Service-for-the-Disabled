"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const serviceKey_json_1 = __importDefault(require("../KEY/serviceKey.json"));
const express_1 = __importDefault(require("express"));
const request_1 = __importDefault(require("request"));
const db = __importStar(require("../db"));
const router = express_1.default.Router();
//SubwayStation Name List from DB
function getSubwayStationName(stNm, callback) {
    try {
        const connection = db.return_connection();
        let SQL = "Select *  FROM subcode_1 a, 도우미번호 b WHERE (a.stin_nm = b.역명 and a.ln_cd = b.운영노선명) and a.STIN_NM like ?; ";
        let nameList = [];
        connection.query(SQL, ["%" + stNm + "%"], function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < results.length; i++) {
                nameList.push({
                    railCd: results[i].RAIL_OPR_ISTT_CD,
                    lnCd: results[i].LN_CD,
                    lnNm: results[i].LN_CD,
                    stCd: results[i].STIN_CD,
                    stNm: results[i].STIN_NM,
                });
            }
            callback(nameList);
        });
    }
    catch (e) {
        console.error(e);
        callback(e);
    }
}
function getSubwayStationInfo(stCd, stNm, callback) {
    try {
        const connection = db.return_connection();
        let sql = "Select * FROM subcode_1 a, 도우미번호 b WHERE (a.stin_nm = b.역명 and a.ln_cd = b.운영노선명) and a.stin_cd = ? and a.stin_nm = ?";
        connection.query(sql, [stCd, stNm], function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            /*
            //NULL error
            if (results.length !== 0) {
                return callback();
            }
            */
            const url = 'https://openapi.kric.go.kr/openapi/convenientInfo/stationInfo';
            let queryParams = '?' + encodeURI('serviceKey');
            queryParams += '=' + serviceKey_json_1.default.subwayRailKey;
            queryParams += '&' + encodeURI('format') + '=' + encodeURI('json');
            queryParams += '&' + encodeURI('railOprIsttCd');
            queryParams += '=' + encodeURI(results[0].RAIL_OPR_ISTT_CD);
            queryParams += '&' + encodeURI('lnCd');
            queryParams += '=' + encodeURI(results[0].LN_CD);
            queryParams += '&' + encodeURI('stinCd');
            queryParams += '=' + encodeURI(results[0].STIN_CD);
            queryParams += '&' + encodeURI('stinNm');
            queryParams += '=' + encodeURI(results[0].STIN_NM);
            return (0, request_1.default)({
                url: url + queryParams,
                method: 'GET'
            }, function (error, response, body) {
                const stationinfo = JSON.parse(body).body[0];
                callback({
                    railCd: stationinfo.railOprIsttCd,
                    lnCd: stationinfo.lnCd,
                    stCd: stationinfo.stinCd,
                    stNm: stationinfo.stinNm,
                    roadNm: stationinfo.roadNmAdr,
                    tmX: stationinfo.stinLocLon,
                    tmY: stationinfo.stinLocLat,
                    wNum: results[0].wnum,
                    eName: results[0].en_name,
                    fCode: results[0].f_code
                });
            });
        });
    }
    catch (e) {
        console.error(e);
        callback(e);
    }
}
function getLiftPos(stCd, stNm, railCd, lnCd, callback) {
    try {
        const url = 'https://openapi.kric.go.kr/openapi/vulnerableUserInfo/stationWheelchairLiftLocation';
        let queryParams = '?' + encodeURI('serviceKey') + '=' + serviceKey_json_1.default.subwayRailKey;
        queryParams += '&' + encodeURI('format') + '=' + encodeURI('json');
        queryParams += '&' + encodeURI('railOprIsttCd') + '=' + encodeURI(railCd);
        queryParams += '&' + encodeURI('lnCd') + '=' + encodeURI(lnCd);
        queryParams += '&' + encodeURI('stinCd') + '=' + encodeURI(stCd);
        return (0, request_1.default)({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            const liftPosInfo = JSON.parse(body).body;
            if (liftPosInfo === undefined) {
                callback(null);
            }
            else
                callback(liftPosInfo[0]);
        });
    }
    catch (e) {
        console.error(e);
        callback(e);
    }
}
function getLiftMove(stCd, stNm, railCd, lnCd, callback) {
    try {
        const liftMoveInfo = [];
        const url = 'https://openapi.kric.go.kr/openapi/vulnerableUserInfo/stationWheelchairLiftMovement';
        let queryParams = '?' + encodeURIComponent('serviceKey');
        queryParams += '=' + serviceKey_json_1.default.subwayRailKey;
        queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
        queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(railCd);
        queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(lnCd);
        queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(stCd);
        return (0, request_1.default)({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            return __awaiter(this, void 0, void 0, function* () {
                //목적지 별로 구분하여 제공
                const liftMoveParse = JSON.parse(body).body;
                let liftInfo = {
                    direction: "",
                    info: []
                };
                //비동기 처리
                for (let i = 0; i < liftMoveParse.length; i++) {
                    if (liftMoveParse[i].mvTpOrdr === 1) {
                        if (liftInfo.info.length !== 0) {
                            const direction = liftInfo.info[liftInfo.info.length - 2].mvContDtl.split('승강장')[0].substr(3);
                            liftInfo.direction = direction;
                            liftMoveInfo.push(liftInfo);
                            liftInfo.direction = "";
                            liftInfo.info = [];
                        }
                    }
                    liftInfo.info.push(liftMoveParse[i]);
                }
                const direction = liftInfo.info[liftInfo.info.length - 2].mvContDtl.split('승강장')[0].substr(3);
                liftInfo.direction = direction;
                liftMoveInfo.push(liftInfo);
                callback(liftMoveInfo);
            });
        });
    }
    catch (e) {
        console.error(e);
        callback(e);
    }
}
function getElevatorPos(stCd, stNm, railCd, lnCd, callback) {
    try {
        const url = 'https://openapi.kric.go.kr/openapi/convenientInfo/stationElevator';
        let queryParams = '?' + encodeURIComponent('serviceKey');
        queryParams += '=' + serviceKey_json_1.default.subwayRailKey;
        queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
        queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(railCd);
        queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(lnCd);
        queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(stCd);
        return (0, request_1.default)({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            const ElevatorPosInfo = JSON.parse(body).body;
            callback(ElevatorPosInfo);
        });
    }
    catch (e) {
        console.error(e);
        callback(e);
    }
}
function getElevatorMove(stCd, stNm, railCd, lnCd, callback) {
    try {
        const url = 'https://openapi.kric.go.kr/openapi/trafficWeekInfo/stinElevatorMovement';
        let queryParams = '?' + encodeURIComponent('serviceKey');
        queryParams += '=' + serviceKey_json_1.default.subwayRailKey;
        queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
        queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(railCd);
        queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(lnCd);
        queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(stCd);
        let elevatorMove = [];
        return (0, request_1.default)({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            let elevatorInfo = {
                direction: "",
                info: []
            };
            const elevatorMoveParse = JSON.parse(body).body;
            for (let i = 0; i < elevatorMoveParse.length; i++) {
                if (elevatorMoveParse[i].mvTpOrdr === 1) {
                    if (elevatorInfo.info.length !== 0) {
                        const direction = elevatorInfo.info[elevatorInfo.info.length - 2].mvContDtl.split('승강장')[0].substr(3);
                        elevatorInfo.direction = direction;
                        elevatorMove.push(elevatorInfo);
                        elevatorInfo.direction = "";
                        elevatorInfo.info = [];
                    }
                }
                elevatorInfo.info.push(elevatorMoveParse[i]);
            }
            const direction = elevatorInfo.info[elevatorInfo.info.length - 2].mvContDtl.split('승강장')[0].substr(3);
            elevatorInfo.direction = direction;
            elevatorMove.push(elevatorInfo);
            callback(elevatorMove);
        });
    }
    catch (e) {
        console.error(e);
        callback(e);
    }
}
function getTransferList(stCd, stNm, railCd, lnCd, callback) {
    try {
        const connection = db.return_connection();
        let transferList = {
            sourceStation: [],
            transferStation: []
        };
        let sql = "Select * FROM subcode_1 WHERE (STIN_CD = ? or STIN_CD = ?) and LN_CD = ? and RAIL_OPR_ISTT_CD = ?;";
        connection.query(sql, [parseInt(stCd) + 1, parseInt(stCd) - 1, lnCd, railCd], function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            let sourceStation = [];
            /*
            if (results.length == 0) {
                return callback({
                    error: 404,
                    errorString: "Not Transfer Station"
                });
            }
            */
            /*else*/ {
                for (let i = 0; i < results.length; i++) {
                    sourceStation.push({
                        stCd: results[i].STIN_CD,
                        stNm: results[i].STIN_NM,
                        railCd: results[i].RAIL_OPR_ISTT_CD,
                        lnCd: results[i].LN_CD
                    });
                }
            }
            transferList.sourceStation = sourceStation;
        });
        sql = "Select * FROM subcode_1 WHERE STIN_NM = ?;";
        connection.query(sql, [stNm], function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            if (results.length === 1) {
                /*
                return callback({
                    error: 404,
                    errorString: "Not Transfer Station"
                });
                */
            }
            for (let i = 0; i < results.length; i++) {
                if (results[i].STIN_CD != stCd) {
                    const sql2 = "Select * FROM subcode_1 WHERE (STIN_CD = ? or STIN_CD = ?) and RAIL_OPR_ISTT_CD = ?;";
                    connection.query(sql2, [parseInt(results[i].STIN_CD) + 1, parseInt(results[i].STIN_CD) - 1, results[i].RAIL_OPR_ISTT_CD], function (err, results2, fields) {
                        let transferStation = [];
                        for (let j = 0; j < results2.length; j++) {
                            transferStation.push({
                                stCd: results2[j].STIN_CD,
                                stNm: results2[j].STIN_NM,
                                railCd: results2[j].RAIL_OPR_ISTT_CD,
                                lnCd: results2[j].LN_CD
                            });
                        }
                        transferList.transferStation = transferStation;
                        callback(transferList);
                    });
                }
            }
        });
    }
    catch (e) {
        console.error(e);
        callback(e);
    }
}
function getTransferInfo(stCd, stNm, railCd, lnCd, prev, chthTgtLn, chtnNextStinCd, callback) {
    try {
        const connection = db.return_connection();
        let sql = "Select * FROM subcode_1 WHERE STIN_NM = ? and LN_CD = ?;";
        let transferInfo = [];
        connection.query(sql, [stNm, chthTgtLn], function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            let prevStinCd;
            if (parseInt(results[0].STIN_CD) + 1 === parseInt(chtnNextStinCd)) {
                prevStinCd = parseInt(results[0].STIN_CD) - 1;
            }
            else {
                prevStinCd = parseInt(results[0].STIN_CD) + 1;
            }
            const url = 'https://openapi.kric.go.kr/openapi/vulnerableUserInfo/transferMovement';
            let queryParams = '?' + encodeURIComponent('serviceKey');
            queryParams += '=' + serviceKey_json_1.default.subwayRailKey;
            queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
            queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(railCd);
            queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(lnCd);
            queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(stCd);
            queryParams += '&' + encodeURIComponent('prevStinCd') + '=' + encodeURIComponent(prevStinCd);
            queryParams += '&' + encodeURIComponent('chthTgtLn') + '=' + encodeURIComponent(chthTgtLn);
            queryParams += '&' + encodeURIComponent('chtnNextStinCd') + '=' + encodeURIComponent(chtnNextStinCd);
            //chtnNextStinCd -> 상행선 1,3
            //chtnNextStinCd -> 하행선 2,4
            //parse Int  어캐해야됨
            //상행 하행 구분 어캐해야됨
            return (0, request_1.default)({
                url: url + queryParams,
                method: 'GET'
            }, function (error, response, body) {
                const parse = JSON.parse(body).body;
                for (let i = 0; i < parse.length; i++) {
                    //성수가 211 하행
                    //railCd로 비교
                    //2호선의 경우 상 하행이 반대
                    if (railCd === "S1" && lnCd === "2") {
                        //환승역 방면이 상행선이라면 2, 4만 나옴
                        if (prevStinCd > parseInt(chtnNextStinCd)) {
                            //출발 방면이 상행선이라면
                            if (parseInt(stCd) > parseInt(prev) && parse[i].mvPathMgNo === 2) {
                                transferInfo.push(parse[i]);
                            }
                            //출발 방면이 하행선이라면
                            else if (parseInt(stCd) < parseInt(prev) && parse[i].mvPathMgNo === 1) {
                                transferInfo.push(parse[i]);
                            }
                        }
                        //하행선인 경우
                        else {
                            //출발 방면이 상행선이라면
                            if (parseInt(stCd) > parseInt(prev) && parse[i].mvPathMgNo === 4) {
                                transferInfo.push(parse[i]);
                            }
                            //출발 방면이 하행선이라면
                            else if (parseInt(stCd) < parseInt(prev) && parse[i].mvPathMgNo === 3) {
                                transferInfo.push(parse[i]);
                            }
                        }
                    }
                    else {
                        //환승역 방면이 상행선이라면 1,3만 나옴
                        if (prevStinCd > parseInt(chtnNextStinCd)) {
                            //출발 방면이 상행선이라면
                            if (parseInt(stCd) > parseInt(prev) && parse[i].mvPathMgNo === 1) {
                                transferInfo.push(parse[i]);
                            }
                            //출발 방면이 하행선이라면
                            else if (parseInt(stCd) < parseInt(prev) && parse[i].mvPathMgNo === 3) {
                                transferInfo.push(parse[i]);
                            }
                        }
                        //하행선인 경우
                        else {
                            //출발 방면이 상행선이라면
                            if (parseInt(stCd) > parseInt(prev) && parse[i].mvPathMgNo === 2) {
                                transferInfo.push(parse[i]);
                            }
                            //출발 방면이 하행선이라면
                            else if (parseInt(stCd) < parseInt(prev) && parse[i].mvPathMgNo === 4) {
                                transferInfo.push(parse[i]);
                            }
                        }
                    }
                }
                callback(transferInfo);
            });
        });
    }
    catch (e) {
        console.error(e);
        callback(e);
    }
}
function getConvenience(stCd, stNm, railCd, lnCd, callback) {
    try {
        const conveneinceInfo = [];
        const url = 'https://openapi.kric.go.kr/openapi/handicapped/stationCnvFacl';
        let queryParams = '?' + encodeURIComponent('serviceKey');
        queryParams += '=' + serviceKey_json_1.default.subwayRailKey;
        queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json');
        queryParams += '&' + encodeURIComponent('railOprIsttCd') + '=' + encodeURIComponent(railCd);
        queryParams += '&' + encodeURIComponent('lnCd') + '=' + encodeURIComponent(lnCd);
        queryParams += '&' + encodeURIComponent('stinCd') + '=' + encodeURIComponent(stCd);
        return (0, request_1.default)({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            const parse = JSON.parse(body).body;
            for (let i = 0; i < parse.length; i++) {
                if (parse[i].gubun === "EV" || parse[i].gubun === "WCLF") {
                    conveneinceInfo.push(parse[i]);
                }
            }
            callback(conveneinceInfo);
        });
    }
    catch (e) {
        console.error(e);
        callback(e);
    }
}
router.get('/stNm/:stNm', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stNm = req.params.stNm;
        yield getSubwayStationName(stNm, stationList => {
            if (stationList.length === 0) {
                return res.status(500).json({
                    error: "No Station"
                });
            }
            else {
                return res.status(200).json(stationList);
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
}));
router.get('/stationInfo/:stCd/:stNm', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stCd = req.params.stCd;
        const stNm = req.params.stNm;
        yield getSubwayStationInfo(stCd, stNm, stationinfo => {
            return res.status(200).json({
                stationinfo
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
router.get('/liftPos/:stCd/:stNm/:railCd/:lnCd', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stCd = req.params.stCd;
        const stNm = req.params.stNm;
        const railCd = req.params.railCd;
        const lnCd = req.params.lnCd;
        yield getLiftPos(stCd, stNm, railCd, lnCd, liftPosInfo => {
            //null인 경우
            if (liftPosInfo === null) {
                return res.status(200).json([]);
            }
            else {
                return res.status(200).json({
                    "railOprIsttCd": liftPosInfo.railOprIsttCd,
                    "lnCd": liftPosInfo.lnCd,
                    "stinCd": liftPosInfo.stinCd,
                    "exitNo": liftPosInfo.exitNo,
                    "dtlLoc": liftPosInfo.dtlLoc,
                    "grndDvNmFr": liftPosInfo.grndDvNmFr,
                    "runStinFlorFr": liftPosInfo.runStinFlorFr,
                    "grndDvNmTo": liftPosInfo.grndDvNmTo,
                    "runStinFlorTo": liftPosInfo.runStinFlorTo,
                    "len": liftPosInfo.len,
                    "wd": liftPosInfo.wd,
                    "bndWgt": liftPosInfo.bndWgt
                });
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
}));
router.get('/liftMove/:stCd/:stNm/:railCd/:lnCd', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stCd = req.params.stCd;
        const stNm = req.params.stNm;
        const railCd = req.params.railCd;
        const lnCd = req.params.lnCd;
        yield getLiftMove(stCd, stNm, railCd, lnCd, callback => {
            return res.status(200).json(callback);
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
router.get('/ElevatorPos/:stCd/:stNm/:railCd/:lnCd', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stCd = req.params.stCd;
        const stNm = req.params.stNm;
        const railCd = req.params.railCd;
        const lnCd = req.params.lnCd;
        yield getElevatorPos(stCd, stNm, railCd, lnCd, callback => {
            return res.status(200).json(callback);
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
router.get('/ElevatorMove/:stCd/:stNm/:railCd/:lnCd', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stCd = req.params.stCd;
        const stNm = req.params.stNm;
        const railCd = req.params.railCd;
        const lnCd = req.params.lnCd;
        yield getElevatorMove(stCd, stNm, railCd, lnCd, callback => {
            return res.status(200).json(callback);
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
router.get('/transferMove/transferList/:stCd/:stNm/:railCd/:lnCd', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stCd = req.params.stCd;
        const stNm = req.params.stNm;
        const railCd = req.params.railCd;
        const lnCd = req.params.lnCd;
        yield getTransferList(stCd, stNm, railCd, lnCd, transferInfo => {
            if (transferInfo.sourceStation.length === 0 || transferInfo.transferStation.length === 0) {
                return res.status(500).json({
                    error: 404,
                    errorString: "Not Transfer Station"
                });
            }
            return res.status(200).json(transferInfo);
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
router.get('/transferMove/transferInfo/:stCd/:stNm/:railCd/:lnCd/:prevStinCd/:chthTgtLn/:chtnNextStinCd', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stCd = req.params.stCd;
        const stNm = req.params.stNm;
        const railCd = req.params.railCd;
        const lnCd = req.params.lnCd;
        const prevStinCd = req.params.prevStinCd;
        const chthTgtLn = req.params.chthTgtLn;
        const chtnNextStinCd = req.params.chtnNextStinCd;
        yield getTransferInfo(stCd, stNm, railCd, lnCd, prevStinCd, chthTgtLn, chtnNextStinCd, callback => {
            return res.json(callback);
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
router.get('/convenience/:stCd/:stNm/:railCd/:lnCd', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stCd = req.params.stCd;
        const stNm = req.params.stNm;
        const railCd = req.params.railCd;
        const lnCd = req.params.lnCd;
        yield getConvenience(stCd, stNm, railCd, lnCd, conveneinceInfo => {
            //No Data
            if (conveneinceInfo.length === 0) {
                return res.status(500).json({
                    error: 404,
                    errorString: "No conveneince"
                });
            }
            else {
                return res.status(200).json(conveneinceInfo);
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
}));
module.exports = router;
