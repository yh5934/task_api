const Task = require("mongoose").model("Task");


class TaskController{

    all(req,res){
        Task.find({}, (err,tasks) =>{
            if(tasks){
                return res.status(200).json(tasks);
            }else{
                return res.status(404).json({
                    "error":err,
                    "message":"failed to find tasks"
                })
            }
        });
    }

    findById(req,res){
        Task.findOne({_id:req.params.id}, (err,task) =>{
            if (task){
                return res.status(200).json(task);
            }else{
                return res.status(404).json({
                    "error":err,
                    "message":"Failed to find task with id" +req.params.id
                });
            }

        });
    }

    create(req,res){
        let task = new Task(req.body);

        task.save(err=>{
            if(err){
                return res.status(403).json({
                    "error":err.errors,
                    "message":"Failed to create Task!"
                });
            }else{
                return res.status(200).json(task);
                        }
        });
    }

    update(req,res){
        // Task.update(
        //     {_id:req.params.id}, 
        //     {$set:{
        //         title:req.body.title, 
        //         description:req.body.description,
        //         completed:req.body.completed
        //     }}, 
        //     () =>{

        // });
        Task.findOne({_id:req.params.id},(err,task) =>{
            if(Task){
                task.title = req.body.title || task.title;
                // if req.body.title is null use task.title
                task.description = req.body.description || task.description;
                task.complted = req.body.completed || task.completed;
                

                task.save(err =>{
                    if(err){
                        return res.status(403).json({
                            "error":err,
                            "message":"Failed to update task" +req.params.id
                        });
                    }else{
                        return res.status(218).json(task);
                    }
                });
            }else{
                return res.status(404).json({
                    "error":err,
                    "message":"Failed to find task "+req.params.id
                });
            }
        });
    }

    delete(req,res){
        Task.findOne({_id:req.params.id},(err,task)=>{
            if(task){
                Task.remove({_id:req.params.id}, (err) =>{
                    if(err){
                        return res.status(404).json({
                            "error":err,
                            "message":"failed to remove taks "+req.params.id
                        });
                    }else{
                        return res.json(task);
                    }
                });
            }else{
                return res.status(404).json({
                    "error":err,
                    "message":"Failed to find taks "+req.params.id

                })

            }
        });
    }

}

module.exports = new TaskController();
