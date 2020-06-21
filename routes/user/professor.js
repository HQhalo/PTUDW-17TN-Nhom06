var express = require('express');
var router = express.Router();
const { populateHeader } = require('../../utils/data');
const authMiddleware = require('../../middlewares/auth');

router.use(authMiddleware.hasRole('PROFESSOR'));

router.get('/propose', function (req, res, next) {
    res.render("professorBookPropose", { layout: "layout", ...populateHeader(req.user) });
});

module.exports = router;