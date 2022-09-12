const router = require('express').Router();

router.get('/test' , async(req,res) =>{
	return res.json({
		test: "test",
	})
})

module.exports = router;