const express = require('express')
const router = express.Router();
const admin = require('../controller/admin/admin.controller');

router.post('/create',admin.saveAdmin);
router.post('/login',admin.adminLogin);
module.exports = router;


