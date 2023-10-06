/**
 * Author: Md Sholayman
 * Description: This is the file where application is running.
 * Date : 06 October,2023.
 */

const express = require("express");
const app = require("./app");



app.listen(`${process.env.RUNNING_PORT}`,()=>{
    console.log(`App is listening on port ${process.env.RUNNING_PORT}`)
});