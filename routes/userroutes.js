const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller');

router.route('/signup').post(usercontroller.signup);
router.route('/login').post(usercontroller.login);
router.route('/logout').get(usercontroller.logout);

module.exports = router;