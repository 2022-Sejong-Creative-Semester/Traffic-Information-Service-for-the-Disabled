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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3005;
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const db = __importStar(require("./db"));
db.connect();
const busdata_1 = __importDefault(require("./routes/busdata"));
const subwaydata_1 = __importDefault(require("./routes/subwaydata"));
let corsOptions = {
    origin: ['http://localhost:3000/#/', 'http://localhost:3000', 'http://localhost:3005', 'http://34.168.80.42:3000', 'http://172.30.1.35:5000', 'http://localhost:5000'],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../Backend/Frontend/creative/build')));
app.use('/bus', busdata_1.default);
app.use('/subway', subwaydata_1.default);
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../Backend/Frontend/creative/build/index.html'));
});
app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});
app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});
//1시간 주기로 MySQL Connection 유지용 쿼리 보내기
const mysql_Connect_Maintenance = setInterval(() => {
    const connection = db.return_connection();
    connection.query("SELECT 1");
}, 360000); //10분
