const router = require('express').Router();

router.get('/perpus', (req, res) => {
    res.json({
        status: 200,
        message: "success from router",
    })
});

module.exports = router