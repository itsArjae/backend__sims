const express = require('express')
const router = express.Router();
const adminController = require('../controller/admin/admin.controller');

router.post('/create',adminController.saveAdmin);
router.post('/login',adminController.adminLogin);
router.get('/fetch/id/:id',adminController.getAdminInfo);

module.exports = router;


