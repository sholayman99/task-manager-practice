/**
 * Author: Md Sholayman
 * Date:06-10-2023
 * Description: This file is for the implementation of routes
 */

const express = require('express');
const { registration, login, userProfileDetails, updateUserProfile, RecoverVerifyEmail, RecoverVerifyOtp, ResetUserPassword } = require('../Controllers/UsersController');
const AuthVerifyMiddleware = require('../Middlewares/AuthVerifyMiddleware');
const { createTasks, removeTask, updateTask, listTaskByStatus,taskStatusCount } = require('../Controllers/TasksController');
const router = express.Router();

//users manage
router.post("/registration" , registration);
router.post("/login" , login);
router.get("/profileDetails" , AuthVerifyMiddleware , userProfileDetails);
router.put("/profileUpdate" , AuthVerifyMiddleware , updateUserProfile);
router.get("/RecoverVerifyEmail/:email" ,RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp", RecoverVerifyOtp);
router.put("/RecoverResetPass" , ResetUserPassword);

//tasks manage
router.post("/createTask" , AuthVerifyMiddleware ,createTasks);
router.delete("/deleteTask/:id" , AuthVerifyMiddleware, removeTask);
router.put("/updateTask/:id/:status" , AuthVerifyMiddleware, updateTask);
router.get("/listTaskByStatus/:status" , AuthVerifyMiddleware , listTaskByStatus);
router.get("/taskStatusCount", AuthVerifyMiddleware ,taskStatusCount)

module.exports = router;