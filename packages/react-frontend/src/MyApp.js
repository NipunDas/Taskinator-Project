import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CalMonth from "./calendar/CalMonth";
import CalWeek from "./calendar/CalWeek";
import CalDay from "./calendar/CalDay";
import MyAddTask from "./taskAdd/MyApp";
import MyTaskList from "./taskList/MyApp";
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
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
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
                    path="week"
                    element={
                        <Navigate
                            replace
                            to={curyear + "-" + curmonth + "-" + curday}
                        />
                    }
                />
                <Route path="week/:newdate" element={<CalWeek />} />
                <Route
                    path="month"
                    element={
                        <Navigate
                            replace
                            to={curyear + "-" + curmonth + "-" + curday}
                        />
                    }
                />
                <Route path="month/:newdate" element={<CalMonth />} />
                <Route
                    path="day"
                    element={
                        <Navigate
                            replace
                            to={curyear + "-" + curmonth + "-" + curday}
                        />
                    }
                />
                <Route path="day/:newdate" element={<CalDay />} />
                <Route path="taskList" element={<MyTaskList />} />
                <Route path="taskAdd" element={<MyAddTask />} />
            </Routes>
        </BrowserRouter>
    );
}

export default MyCalendar;
