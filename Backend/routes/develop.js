const router = require('express').Router();
const request = require('request');
const convert = require('xml-js');
const serviceKey = require('../Key/serviceKey.json');

const SQL_info = require('../Key/SQL_info.json')
const mysql = require('mysql');

const conn = {
	host: SQL_info.host,
	port: SQL_info.port,
	user: SQL_info.user,
	password: SQL_info.password,
	database: SQL_info.database
};

let connection = mysql.createConnection(conn);  // DB Connect

//SubwayStation Name List from DB
function getSubwayStationName(stNm, callback) {
	try {

		console.log("StationName");

		let sql = "Select *  FROM subcode_1,subcode_2;";

		let NameList = [];
		connection.query(sql, function (err, results, fields) {
			if (err) {
				console.log(err);
			}

			callback(results);
		});

	}
	catch (e) {
		console.error(e);
		callback(e);
	}
}

router.get('/stNm/:stNm', async (req, res) => {
	try {

		stNm = req.params.stNm;

		await getSubwayStationName(stNm, stationList => {
			if (stationList.length == 0) {
				return res.status(500).json({
					error: "No Station"
				})
			}
			else {
				return res.json(
					stationList,
				)
			}

		});
	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		})
	}
})

module.exports = router;