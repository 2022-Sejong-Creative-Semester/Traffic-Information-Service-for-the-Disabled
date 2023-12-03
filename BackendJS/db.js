"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.return_connection = exports.connect = void 0;
const SQL_info_json_1 = __importDefault(require("./KEY/SQL_info.json"));
const mysql_1 = __importDefault(require("mysql"));
var connection;
//인터페이스로 정의
const conn = {
    host: SQL_info_json_1.default.host,
    port: SQL_info_json_1.default.port,
    user: SQL_info_json_1.default.user,
    password: SQL_info_json_1.default.password,
    database: SQL_info_json_1.default.database
};
function connect() {
    connection = mysql_1.default.createConnection(conn); // DB Connect
    connection.connect(function (err) {
        if (err) {
            console.error(err);
            console.error("MySQL connection err");
            return;
        }
        console.log("MySQL connected");
    });
    return connection;
}
exports.connect = connect;
function return_connection() {
    return connection;
}
exports.return_connection = return_connection;
