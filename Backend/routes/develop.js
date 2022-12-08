const router = require('express').Router();
const request = require('request');
const convert = require('xml-js');
const serviceKey = require('../Key/serviceKey.json');

function getStationInfo(arsId, callback) {

	try {

	}
	catch (e) {
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		});
	}

}

router.get('/arsId/:arsId', async (req, res) => {

	console.log('arsId');

	const arsId = req.params.arsId;
	//console.log("station");
	try {
		await getStationInfo(arsId, stationinfo => {
			//console.log(station);
			if (stationinfo == 0) {
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

module.exports = router;