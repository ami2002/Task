const { response } = require("express");
const {Task} = require("../models/task");

const getTask=async(request,response)=>{
    var taskId=request.query.id;
    if(taskId){
        try{
    var alltask= await Task.findById(taskId);
        }
        catch{
alltask=null;
        }
    }
    else{
var alltask=await Task.find();
    }
   
return response.json(alltask);


}

const createNewTask=async(request,response)=>{
   const task=new Task(request.body);
   await task.save();
    return response.json({data:"Task created"})
}


const updateTask=async(request,response)=>{
    var taskId=request.query.id;
    await Task.findByIdAndUpdate(taskId,request.body);
    return response.json({data:"Task Updated"});
}

const deleteTask=async(request,response)=>{
    var taskId=request.query.id;
try{
    var task=await Task.findById(taskId);
    if(!task){
        return response.json({status:"Error"});
    }
}
catch{
    return response.json({status:"Error"});
}
     await Task.findByIdAndDelete(taskId,request.body);
    return response.status(404).json({data:"Task Deleted"});
}


const updateStatus = async (request,response) => {
    var getdata = { status: false };
 
    var setdata = {$set: {status: true} };
    await Task.updateMany(getdata,setdata)
    return response.json("Details Updated");
}


module.exports={getTask,createNewTask,updateTask,deleteTask,updateStatus};