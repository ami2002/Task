const server = require("express");
const cors = require("cors");
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");
const emailValidator = require("email-validator");
//const { default: mongoose } = require("mongoose");

// todo -Database connect

mongoose.connect("mongodb://127.0.0.1:27017/g4_mern");
mongoose.connection.on("connected",()=>{
    console.log("CONNECTED DB");
});

mongoose.connection.on("error",()=>{
    console.log("CONNECTION ERROR DB");
});

const {getTask,createNewTask, updateTask,deleteTask,updateStatus}=require("./src/controllers/index.js")
const app=server();
app.use(cors());
app.use(bodyParser.json());
app.post("/create-new-task",createNewTask)
app.put("/update-task",updateTask);
app.get("/data",getTask);
app.delete("/delete-task",deleteTask);
app.put("/update-status",updateStatus);
app.listen(7000,()=>{
    console.log("Server Started on port 7000");
});