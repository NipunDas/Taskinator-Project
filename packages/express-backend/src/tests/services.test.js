import mut from "../services.js";
import mongoose from "mongoose";

/* This file contains test for the serivces.js, user.js, and task.js files. It
   is only meant to test backend CRUD operations and not API endpoints, so
   backend.js and auth.js are not tested. */

test("Creating and deleting users and task lists", async () => {
    const newUser = {
        name: "Test User",
        username: "jest_test123",
        hashedPassword: "xyz"
    };

    // creating user (and task list simultaneously)
    const createdUser = await mut.instantiateUser(newUser);
    expect(createdUser.name).toBe("Test User");
    expect(createdUser.username).toBe("jest_test123");
    expect(createdUser.hashedPassword).toBe("xyz");
    let taskList = await mut.getTaskListById(createdUser.taskList);
    expect(taskList.tasks.length).toBe(0);

    // add a task just to test functionality
    const newTask = {
        name: "Test task",
        priority: 1
    };
    await mut.addTask(createdUser.taskList, newTask);
    taskList = await mut.getTaskListById(createdUser.taskList);
    expect(taskList.tasks.length).toBe(1);
    expect(taskList.tasks[0].name).toBe("Test task");

    // deleting task list on its own
    const deletedTaskList = await mut.deleteTaskListById(taskList._id);
    taskList = await mut.getTaskListById(createdUser.taskList);
    expect(deletedTaskList.tasks.length).toBe(1);
    expect(taskList).toBeNull();

    // deleting user
    const deletedUser = await mut.deleteUserById(createdUser._id);
    const attemptedUserQuery = await mut.getUserById(createdUser._id);
    expect(deletedUser.name).toBe("Test User");
    expect(deletedUser.username).toBe("jest_test123");
    expect(deletedUser.hashedPassword).toBe("xyz");
    expect(attemptedUserQuery).toBeNull();
}, 10000); // 10000 ms increased timeout since this test has a lot of awaits

test("Testing get user with name specified", async () => {
    const users = await mut.getUsers();
    const filteredUsers = users.filter((user) => user.username === "username");
    expect(filteredUsers[0].name).toBe("Test User");
    expect(filteredUsers[0].username).toBe("username");
});

test("Testing get user with name specified", async () => {
    const user = await mut.getUsers("Test User");
    expect(user[0].name).toBe("Test User");
    expect(user[0].username).toBe("username");
});

test("Testing get user by ID", async () => {
    const user = await mut.getUserById("6570a3c7dc2a7b41eab7c64b");
    expect(user.name).toBe("Test User");
    expect(user.username).toBe("username");
});

test("Testing get user by username", async () => {
    const user = await mut.getUserByUsername("username");
    expect(user.name).toBe("Test User");
    expect(user.username).toBe("username");
});

test("Testing getting task list by ID", async () => {
    const expectedNumTasks = 32;
    const taskList = await mut.getTaskListById("65553647a73a1b75066a47ab");
    expect(taskList.tasks.length).toBe(expectedNumTasks);
});

test("Test manipulating tasks", async () => {
    const newTask = {
        name: "Test task",
        priority: 3
    };

    // adding a new task
    let taskList = await mut.addTask("6570a3c7dc2a7b41eab7c649", newTask);
    const receivedNewTask = taskList.tasks.filter(
        (task) => task.name === "Test task"
    )[0];
    expect(receivedNewTask.name).toBe("Test task");
    expect(receivedNewTask.priority).toBe(3);

    // editing the task
    receivedNewTask.priority = 2;
    await mut.editTask("6570a3c7dc2a7b41eab7c649", receivedNewTask);
    taskList = await mut.getTaskListById("6570a3c7dc2a7b41eab7c649");
    const receivedEditedTask = taskList.tasks.filter(
        (task) => task.name === "Test task"
    )[0];
    expect(receivedEditedTask.name).toBe("Test task");
    expect(receivedEditedTask.priority).toBe(2);

    // deleting the task
    await mut.deleteTask("6570a3c7dc2a7b41eab7c649", receivedEditedTask.id);
    taskList = await mut.getTaskListById("6570a3c7dc2a7b41eab7c649");
    const queriedTasks = taskList.tasks.filter(
        (task) => task.name === "Test task"
    );
    expect(queriedTasks.length).toBe(0);
});

test("Testing MongoDB connection", async () => {
    // close connection first
    await mongoose.connection.close();

    /* try an invalid connection, ensure that erorr is not thrown and is caught
       by connectToMongo() */
    const INVALID_URI = "INVALID_URI";
    const invalid_connect = async () => {
        await mut.connectToMongo(INVALID_URI);
    };
    expect(invalid_connect).not.toThrow(mongoose.Error);
});

// To stop mongoDB connection using Jest's afterAll hook
afterAll(async () => {
    await mongoose.connection.close();
});
