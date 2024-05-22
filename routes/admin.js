var express = require('express');
var router = express.Router();

var admin = require('../controller/admincontoller')

router.get('/',admin.login)
router.get('/viewblog',admin.viewblog)
router.get('/userviewblog/:id',admin.userviewblog)
router.get('/viewstatusblog',admin.statusblog)
router.post('/updateblog/:id',admin.updateblog)
router.get('/deleteblog',admin.deleteblog)
router.get('/manageuser',admin.manageuser)

module.exports = router;
