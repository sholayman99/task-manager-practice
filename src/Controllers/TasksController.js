const TaskModel = require("../Models/TaskModel")


//creating task
exports.createTasks = async(req,res) =>{

    try {
       let reqBody = req.body ;
        reqBody.email = req.headers.email ;
        console.log(reqBody)
        let result = await TaskModel.create(reqBody) ;
        res.status(201).json({message:"sucesss", data:result});
    } catch (error) {
        res.status(400).json({message:"Failed", data:error.toStringify()});
    }
};

//deleting a single task
exports.removeTask = async(req,res) =>{
    let id = req.params.id ;
    try {
      let result = await TaskModel.deleteOne({_id:id}) ;
      res.status(201).json({message:"sucesss", data:result});
    } catch (error) {
      res.status(400).json({message:"Failed", data:error.toStringify()});
    }
};


//updating a task
exports.updateTask = async(req,res) =>{

let id = req.params.id;
let status = req.params.status;

  try {
  let result = await TaskModel.updateOne({ _id:id} , {status:status});
  res.status(201).json({message:"sucesss", data:result});

  } catch (error) {
  res.status(400).json({message:"Failed", data:error});
  }
};

// List Task By Status
exports.listTaskByStatus = async(req, res) =>{
  let status = req.params.status;
  console.log(status)
  let email = req.headers.email;
    try {
      let result = await TaskModel.find({status:status,email:email});
      res.status(200).json({message:"sucesss", data:result});

    } catch (error) {
      res.status(400).json({message:"Failed", data:error});
    }
}

//task Status Count

exports.taskStatusCount = async(req,res) =>{
   try {
    let email = req.headers.email ;
    let result = await TaskModel.aggregate([
      {$match:{email:email}},
      {$group:
        {_id:"$status" , total:{$count:{}}}}
    ]);
    res.status(200).json({message:"sucesss", data:result});
   } catch (error) {
    res.status(400).json({message:"Failed", data:error});
   }
}