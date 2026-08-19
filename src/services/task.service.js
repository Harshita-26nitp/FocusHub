import Task from "../models/Task.js";
import Room from "../models/Room.js";
export const createTaskService = async (roomId,taskData,user) => {
    const room = await Room.findById(roomId);
    if (!room) {
        throw new Error("Room not found ");
    }
    const isParticipant =room.participants.some(participant =>participant.equals(user._id));
      if(!isParticipant) {
        throw new Error("You are not a participant of this room");
    }
    const { title, description,assignedTo,priority } = taskData;
    if (!title || !title.trim()) {
        throw new Error("Task title is required");
    }
    if (assignedTo) {
        const isAssignedUser = room.participants.some(
            participant =>participant.equals(assignedTo));
        if (!isAssignedUser) {
            throw new Error(
                "Assigned user is not a member of this room"
            );
        }
    }
    const task = await Task.create({
        title: title.trim(),
        description,
        room: roomId,
        createdBy: user._id,
        assignedTo: assignedTo || null,
        priority: priority || "MEDIUM"
    });

    return await task.populate([
        {
            path: "createdBy",
            select: "fullName username"
        },
        {
            path: "assignedTo",
            select: "fullName username"
        }
    ]);
};
export const getRoomTasksService = async (roomId, user) => {
    const room = await Room.findById(roomId);

    if (!room) {
        throw new Error("Room not found");
    }

    const isParticipant = room.participants.some(
        participant => participant.equals(user._id)
    );

    if (!isParticipant) {
        throw new Error("You are not a participant of this room");
    }

    const tasks = await Task.find({
        room: roomId
    })
        .populate("createdBy", "fullName username")
        .populate("assignedTo", "fullName username")
        .sort({ createdAt: -1 });

    return tasks;
};
export const updateTaskService = async (
    taskId,
    taskData,
    user
) => {
    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    const room = await Room.findById(task.room);

    if (!room) {
        throw new Error("Room not found");
    }

    const isParticipant = room.participants.some(
        participant => participant.equals(user._id));

    if (!isParticipant) {
        throw new Error("You are not a participant of this room");
    }
    const {
        title,
        description,
        status,
        priority,
        assignedTo
    } = taskData;
    if (assignedTo !== undefined) {
        if (assignedTo === null) {
            task.assignedTo = null;
        } else {
            const isAssignedUser = room.participants.some(
                participant => participant.equals(assignedTo)
            );

            if (!isAssignedUser) {
                throw new Error(
                    "Assigned user is not a member of this room"
                );
            }

            task.assignedTo = assignedTo;
        }
    }
    if (title !== undefined) {
        if (!title.trim()) {
            throw new Error("Task title cannot be empty");
        }
        task.title = title.trim();
    }
    if (description !== undefined) {
        task.description = description;
    }

    if (status !== undefined) {
        task.status = status;
    }

    if (priority !== undefined) {
        task.priority = priority;
    }

    await task.save();

    return await task.populate([
        {
            path: "createdBy",
            select: "fullName username"
        },
        {
            path: "assignedTo",
            select: "fullName username"
        }
    ]);
};
export const deleteTaskService = async (taskId, user) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new Error("Task not found");
    }

    if (!task.createdBy.equals(user._id)) {
        throw new Error(
            "Only the task creator can delete this task"
        );
    }
    await task.deleteOne();
    return task;
};