/**
 * Author: Md Sholayman
 * Date:06-10-2023
 * Description: This file is for the implementation of routes
 */

const express = require('express');
const { registration, login, userProfileDetails } = require('../Controllers/UsersController');
const AuthVerifyMiddleware = require('../Middlewares/AuthVerifyMiddleware');
const router = express.Router();


router.post("/registration" , registration)
router.post("/login" , login)
router.get("/profileDetails" , AuthVerifyMiddleware , userProfileDetails)


module.exports = router;