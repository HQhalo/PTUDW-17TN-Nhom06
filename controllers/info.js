const {populateHeader} = require('../utils/data');

const infomation = function (req, res, next) {
    res.render("info", { 
        layout: "layout", ...populateHeader(req.user),
        info: {
            name: req.user.name,
            id: req.user.userId,
            phone: req.user.phone,
            email: req.user.email
        },
    });
  }
module.exports = {
    infomation
}