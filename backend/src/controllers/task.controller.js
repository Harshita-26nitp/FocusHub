import {createTaskService,getRoomTasksService,updateTaskService,deleteTaskService} from "../services/task.service.js";
export const createTask=async(req,res)=>{
    try{
        const task=await createTaskService(req.params.roomId,req.body,req.user);
        res.status(201).json({
            success:true,
            message:"Task created successfully",
            data:task
        });
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};
export const getRoomTasks=async(req,res)=>{
    try{
        const tasks=await getRoomTasksService(req.params.roomId,req.user);
        res.status(200).json({
            success:true,
            message:"Tasks fetched successfully",
            data:tasks
        });
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};
export const updateTask=async(req,res)=>{
    try{
        const task=await updateTaskService(req.params.taskId,req.body,req.user);
        res.status(200).json({
            success:true,
            message:"Task updated successfully",
            data:task
        });

    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};
export const deleteTask=async(req,res)=>{
  try{
    const task=await deleteTaskService(req.params.taskId,req.user);
    res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: task
});
  }
  catch(error){
    res.status(400).json({
        success:false,
        message:error.message
    });
  }
};
