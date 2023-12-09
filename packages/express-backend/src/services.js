import mongoose from "mongoose";
import userModel from "./user.js";
import taskListModel from "./task.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("debug", true);

/* connect function */
async function connectToMongo(uri) {
    await mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .catch((error) => console.log(error));
}

// connectiong to MongoDB
await connectToMongo(process.env.MONGODB_URI);
console.log(process.env.MONGODB_URI.length);

/* Gets all users */
function getUsers(name) {
    let promise;
    if (name) {
        promise = userModel.find({ name: name });
    } else {
        promise = userModel.find();
    }
    return promise;
}

/* Gets a user by their id */
function getUserById(id) {
    return userModel.findById(id);
}

/* Gets a user by their username */
function getUserByUsername(username) {
    return userModel.findOne({ username: username });
}

/* Gets a task list by its id */
function getTaskListById(id) {
    return taskListModel.findById(id);
}

/* Creates a new empty task list */
function createTaskList() {
    const taskListJson = { tasks: [] };
    const newTaskList = new taskListModel(taskListJson);
    const promise = newTaskList.save();
    return promise;
}

/* Deletes a task list */
function deleteTaskListById(id) {
    return taskListModel.findByIdAndDelete(id);
}

/* Deletes a user by their given id */
function deleteUserById(id) {
    return userModel.findByIdAndDelete(id);
}

/* Instantiates a user with the given name and an empty task list */
async function instantiateUser(user) {
    user.taskList = (await createTaskList())._id;
    const newUser = new userModel(user);
    const promise = newUser.save();
    return promise;
}

/* Adds a task to a task list, given that task list's id */
function addTask(taskList_id, task) {
    const promise = taskListModel.findByIdAndUpdate(
        taskList_id,
        {
            $push: { tasks: task }
        },
        { returnDocument: "after" }
    );
    return promise;
}

/* Deletes a task from a task list, given that task list and the task's id */
function deleteTask(taskList_id, task_id) {
    const promise = taskListModel.findByIdAndUpdate(taskList_id, {
        $pull: { tasks: { _id: task_id } }
    });
    return promise;
}

/* Edits a task from a task list, given that task list and the task object (which
    includes the task's id) */
function editTask(taskList_id, task) {
    const promise = taskListModel.updateOne(
        { _id: taskList_id, "tasks._id": task._id },
        { $set: { "tasks.$": task } }
    );
    return promise;
}

export default {
    connectToMongo,
    getUsers,
    getUserById,
    getUserByUsername,
    getTaskListById,
    instantiateUser,
    addTask,
    deleteTask,
    editTask,
    deleteUserById,
    deleteTaskListById
};
