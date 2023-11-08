import mongoose from "mongoose";
import userModel from "./user.js";
import taskListModel from "./task.js";

mongoose.set("debug", true);

mongoose
    .connect("mongodb://127.0.0.1:27017/taskinator", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch((error) => console.log(error));

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
    return userModel.findById(new mongoose.Types.ObjectId(id));
}

/* Creates a new empty task list */
function createTaskList() {
    const taskListJson = { tasks: [] };
    const newTaskList = new taskListModel(taskListJson);
    const promise = newTaskList.save();
    return promise;
}

/* Instantiates a user with the given name and an empty task list */
async function instantiateUser(user) {
    user.taskList = (await createTaskList())._id;
    const newUser = new userModel(user);
    const promise = newUser.save();
    return promise;
}

export default {
    getUsers,
    getUserById,
    instantiateUser
};
