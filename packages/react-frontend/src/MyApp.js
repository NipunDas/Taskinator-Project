import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CalMonth from "./calendar/CalMonth";
import CalWeek from "./calendar/CalWeek";
import CalDay from "./calendar/CalDay";
import MyAddTask from "./taskAdd/AddTask";
import MyTaskList from "./taskList/TaskList";
import Login from "./authPages/Login.js";
import Signup from "./authPages/SignUp.js";
const curdate = new Date();
const curyear = curdate.getFullYear();
const curmonth = curdate.getMonth() + 1;
const curday = curdate.getDate();

/*
Notes for Implementation With Backend:
CalMonth, CalWeek, and CalDay all input events in an array
CalDay is a 1-D array input
  Input is title, start-time (in minutes*), duration (in minutes*), description, and color
CalWeek is a 2-D array with 7 arrays, each for a day in the week
  Input is title, start-time (in minutes*), duration (in minutes*), description, and color
CalMonth are 6 arrays 42 entries long, each for a day in the monthly calendar
  Input is title and color (There are an equal split of each)

*CalWeekSquare Currently Takes Time Inputs (Start Time and Duration) as minutes from 0
So To Go From Date to Time, date.getHours() * 60 + date.getMinutes()

Other Notes:
There are many parts of each file that aren't used by the file and thus can be removed
*/
function MyCalendar() {
    const INVALID_TOKEN = "INVALID_TOKEN";
    const [token, setToken] = useState(INVALID_TOKEN);
    const [taskListId, setTaskListId] = useState("");

    function addAuthHeader(otherHeaders = {}) {
        if (token === INVALID_TOKEN) {
            return otherHeaders;
        } else {
            return {
                ...otherHeaders,
                Authorization: `Bearer ${token}`
            };
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route
                    path="/login"
                    element={
                        <Login
                            saveToken={setToken}
                            setTaskListId={setTaskListId}
                        />
                    }
                />
                <Route
                    path="calendar"
                    element={
                        <Navigate
                            replace
                            to={
                                "month/" +
                                curyear +
                                "-" +
                                curmonth +
                                "-" +
                                curday
                            }
                        />
                    }
                />
                <Route
                    path="calendar/week"
                    element={
                        <Navigate
                            replace
                            to={curyear + "-" + curmonth + "-" + curday}
                        />
                    }
                />
                <Route
                    path="calendar/week/:newdate"
                    element={
                        <CalWeek
                            addHeader={addAuthHeader}
                            taskList={taskListId}
                        />
                    }
                />
                <Route
                    path="calendar/month"
                    element={
                        <Navigate
                            replace
                            to={curyear + "-" + curmonth + "-" + curday}
                        />
                    }
                />
                <Route
                    path="calendar/month/:newdate"
                    element={
                        <CalMonth
                            addHeader={addAuthHeader}
                            taskList={taskListId}
                        />
                    }
                />
                <Route
                    path="calendar/day"
                    element={
                        <Navigate
                            replace
                            to={curyear + "-" + curmonth + "-" + curday}
                        />
                    }
                />
                <Route
                    path="calendar/day/:newdate"
                    element={
                        <CalDay
                            addHeader={addAuthHeader}
                            taskList={taskListId}
                        />
                    }
                />
                <Route
                    path="taskList"
                    element={
                        <MyTaskList
                            addHeader={addAuthHeader}
                            taskList={taskListId}
                        />
                    }
                />
                <Route
                    path="taskAdd"
                    element={
                        <MyAddTask
                            addHeader={addAuthHeader}
                            taskList={taskListId}
                        />
                    }
                />
                <Route
                    path="signup"
                    element={
                        <Signup
                            saveToken={setToken}
                            setTaskListId={setTaskListId}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default MyCalendar;
