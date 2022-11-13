const router = require('express').Router();
const testjson = require('../routes/subwaytest.json');

router.get('/test/liftPos' , async(req,res) =>{
	const Tjson = testjson;
	console.log(Tjson.body);
	return res.json(Tjson.body);
})

module.exports = router;