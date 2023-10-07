/**
 * Author: Md Sholayman
 * Date:06-10-2023
 * Description: This file is for the implementation of routes
 */

const express = require('express');
const { registration, login, userProfileDetails, updateUserProfile, RecoverVerifyEmail } = require('../Controllers/UsersController');
const AuthVerifyMiddleware = require('../Middlewares/AuthVerifyMiddleware');
const router = express.Router();


router.post("/registration" , registration);
router.post("/login" , login);
router.get("/profileDetails" , AuthVerifyMiddleware , userProfileDetails);
router.put("/profileUpdate" , AuthVerifyMiddleware , updateUserProfile);
router.get("/RecoverVerifyEmail/:email" ,RecoverVerifyEmail)


module.exports = router;