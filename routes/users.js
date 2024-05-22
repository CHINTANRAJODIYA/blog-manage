var express = require('express');
const multer  = require('multer');
var router = express.Router();

var user = require('../controller/usercontroller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

router.post('/',user.register)
router.post('/login',user.login)
router.post('/addblog',upload.single('blog_img'),user.addblog)
router.post('/addcategory',user.addcategory)
router.get('/viewblog',user.viewblog)
router.post('/updateblog',user.updateblog)
router.get('/deleteblog',user.deleteblog)
router.post('/likeblog/:id',user.likeblog)
router.post('/comment/:id',user.comment)
router.get('/viewcomment/:id',user.viewcomment)


module.exports = router;
