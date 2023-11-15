import React, {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import CalMonth from "./Calendar/CalMonth";
import CalWeek from "./Calendar/CalWeek";
import CalDay from "./Calendar/CalDay";

const curdate = new Date();
const curyear = curdate.getFullYear();
const curmonth = curdate.getMonth() + 1;
const curday = curdate.getDate();

/*
Notes for Implementation With Backend:
CalMonth, CalWeek, and CalDay all input events in an array
CalDay is a 1-D array input
CalMonth and CalWeek have 2-D array inputs
CalWeekSquare Currently Takes Time Inputs (Start Time and Duration) as minutes from 0
So To Go From Date to Time, date.getHours() * 60 + date.getMinutes()

Other Notes:
There are many parts of each file that aren't used by the file and thus can be removed
*/
function MyApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "week" element={<Navigate replace to = {curyear + "-" + curmonth + "-" + curday} />} />
        <Route path = "week/:newdate" element = {<CalWeek/>} />
        <Route path = "month" element={<Navigate replace to = {curyear + "-" + curmonth + "-" + curday} />} />
        <Route path = "month/:newdate" element = {<CalMonth/>} />
        <Route path = "day" element={<Navigate replace to = {curyear + "-" + curmonth + "-" + curday} />} />
        <Route path = "day/:newdate" element = {<CalDay/>} />
      </Routes>
    </BrowserRouter>
    );
 }

 export default MyApp;