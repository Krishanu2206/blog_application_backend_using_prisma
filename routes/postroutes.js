const express = require('express');
const router = express.Router();
const postcontroller = require('../controllers/postcontroller');
const isloggedin = require('../middlewares/isloggedin');
const isowner = require('../middlewares/isowner');

router.route('/createpost').post(isloggedin, postcontroller.createpost);
router.route('/updatepost/:id').put(isloggedin, isowner, postcontroller.updatepost);
router.route('/deletepost/:id').delete(isloggedin, isowner, postcontroller.deletepost);
router.route('/getallposts').get(postcontroller.getallposts);
router.route('/getuserposts').get(isloggedin, postcontroller.getuserposts);

module.exports = router;