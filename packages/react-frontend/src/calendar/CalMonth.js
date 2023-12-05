import React, { useState, useEffect } from "react";
import CalendarSquare from "./CalMonthSquare";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { API_URL } from "../Consts.js";

/*
Calendar Month

To add events, place titles in the following arrays
events0
events1
events2
*/
const CalMonth = (props) => {
    const taskList = props.taskList;
    const addHeader = props.addHeader;

    useEffect(() => {
        function fetchTasks() {
            const promise = fetch(`${API_URL}/task-lists/${taskList}`, {
                headers: addHeader()
            });
            return promise;
        }
        fetchTasks()
            .then((res) => res.json())
            .then((json) => setTasks(json["tasks"]))
            .catch((error) => {
                console.log(error);
                setTasks(null); // To indicate API call failed
            });
    }, [taskList, addHeader]);

    /* HELPER FUNCTIONS */
    //Increases or Decreases The Selected Month
    function IncreaseMonth(left) {
        var newmonth = date.getMonth() + left;
        var newyear = date.getFullYear();
        if (newmonth > 11) {
            newmonth = 0;
            newyear++;
        }
        if (newmonth < 0) {
            newmonth = 11;
            newyear--;
        }
        setDate(new Date(newyear, newmonth, 1));
    }

    //Convert Date to String For Linking
    function linkString(linkDate) {
        const linkYear = linkDate.getFullYear();
        const linkMonth = linkDate.getMonth() + 1;
        const linkDay = linkDate.getDate();
        return linkYear + "-" + linkMonth + "-" + linkDay;
    }

    //Determines if two dates are the same
    function sameDay(d1, d2) {
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    }

    //Add Task
    function addTask(task, i){
        if (!events0[i]) {
            events0[i] = task["name"];
            eventcolors0[i] = "red";
        } else if (!events1[i]) {
            events1[i] = task["name"];
            eventcolors1[i] = "blue";
        } else if (!events2[i]) {
            events2[i] = task["name"];
            eventcolors2[i] = "yellow";
        }
    }

    //Constants
    const [tasks, setTasks] = useState([]);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const maxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const daysnum = 42;

    //Note: Vulnerable to invalid dates
    let params = useParams();
    var pstDate = params["newdate"] + " PST";
    var [date, setDate] = useState(new Date(pstDate));
    //Obtain first day of the month
    var firstdate = new Date(date.getFullYear(), date.getMonth(), 1);
    var month = firstdate.getMonth();
    var day = firstdate.getDay();
    var year = firstdate.getFullYear();

    // To indicate API call failed
    if (!tasks) {
        return <caption>Data Unavailable</caption>;
    }

    //Leap Year Calculation
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                maxDays[1] = 29;
            } else {
                maxDays[1] = 28;
            }
        } else {
            maxDays[1] = 29;
        }
    } else {
        maxDays[1] = 28;
    }

    //Filling Up A Size 42 Array With The Dates To Display For The Month
    var displaydays = new Array(daysnum);
    for (var i = 0; i < daysnum; i++) {
        //First day isn't always Sunday
        if (i < day) {
            var newyear = year;
            var newmonth = month - 1;
            if (newmonth < 0) {
                newyear = year - 1;
                newmonth = 11;
            }
            displaydays[i] = new Date(
                newyear,
                newmonth,
                maxDays[newmonth] - day + i + 1
            );
        } else {
            displaydays[i] = new Date(year, month, i - day + 1);
        }
    }

    //Calendar Position
    const headerx = 350;
    const headery = 25;
    const header_width = 600;
    const header_height = 60;
    const calendarx = 90;
    const calendary = 150;

    //Array of Events and Event Colors
    //Note: Event Colors Currently Hardcoded
    var events0 = new Array(daysnum);
    var eventcolors0 = new Array(daysnum);
    var events1 = new Array(daysnum);
    var eventcolors1 = new Array(daysnum);
    var events2 = new Array(daysnum);
    var eventcolors2 = new Array(daysnum);

    /* ADD EVENT GET CODE */
    for (let j = 0; j < tasks.length; j++) {
        var task = tasks[j];
        //Tasks without names or dates cannot be placed
        if (!task["name"] || !task["date"]) continue;
        var s = task["date"];
        //Converts UTC Date to Local Time
        var startDate = new Date(s.replace(/-/g, "/").replace("T", " "));
        for (let i = 0; i < daysnum; i++) {
            //Ensure Task Is Actually A Part Of The Day
            if (!sameDay(new Date(startDate), displaydays[i])) continue;
            //Add Task
            addTask(task, i);
        }
        var periodic = task["periodic"];
        //Check Periodic Tasks
        if(periodic != null && periodic !== ""){
            switch (periodic[0]) {
            //Daily
            case "D":
                for(let i = 0; i < daysnum; i++){
                    if(displaydays[i] > startDate){
                        addTask(task, i);
                    }
                }
                    break;
            //Every Other Day
            case "O":
                for(let i = 0; i < daysnum; i++){
                    if(displaydays[i] > startDate 
                        && Math.ceil((displaydays[i].getTime() - startDate.getTime()) / (1000 * 3600 * 24)) % 2 === 0){
                        addTask(task, i);                            }
                }
                break;
            //Every Week
            case "W":
                var pWeekday = [];
                for(let i = 1; i < periodic.length; i++){
                    if(periodic[i] === "1")pWeekday.push(i - 1);
                }
                for(let i = 0; i < daysnum; i++){
                    if(displaydays[i] > startDate 
                        && pWeekday.includes(displaydays[i].getDay())){
                        addTask(task, i);
                    }
                }
                break;
            //Every Month
            case "M":
                for(let i = 0; i < daysnum; i++){
                    if(displaydays[i] > startDate){
                        //In the case that the date is outside the range of the current month, place event at end of month
                        if(startDate.getDate() > maxDays[displaydays[i].getMonth()] && displaydays[i].getDate() === maxDays[displaydays[i].getMonth()] ){
                            addTask(task, i);
                        }
                        else if(displaydays[i].getDate() === startDate.getDate()){
                            addTask(task, i);
                        }
                    }
                }
                break;
            //Every Year
            case "Y":
                for(let i = 0; i < daysnum; i++){
                    if(displaydays[i] > startDate){
                        if(startDate.getDate() === displaydays[i].getDate() && startDate.getMonth() === displaydays[i].getMonth()){
                            addTask(task, i);
                        }
                        //Event On Leap Day
                        else if(startDate.getMonth() === 1 
                            && startDate.getDate() === 29 
                            && displaydays[i].getMonth() === 1
                            && displaydays[i].getDate() === 28
                            && maxDays[1] === 28){
                            addTask(task, i);              
                        }
                    }
                }
                break;
            default:
                break;
            }
        }
    }

    return (
        <div className="Main">
            <div
                style={{
                    background: "#ADD8E6",
                    position: "absolute",
                    transform: `translate(${headerx}px, ${headery}px)`,
                    border: "solid",
                    width: header_width,
                    height: header_height
                }}
            >
                <p
                    align="center"
                    style={{
                        fontSize: 40,
                        fontWeight: "bold"
                    }}
                >
                    {months[date.getMonth()]} {date.getFullYear()}
                </p>
            </div>

            <div>
                <button
                    style={{
                        background: "red",
                        position: "absolute",
                        transform: `translate(${headerx}px, ${headery}px)`,
                        width: header_width / 7,
                        height: header_height,
                        fontSize: 20
                    }}
                    onClick={() => IncreaseMonth(-1)}
                >
                    {" "}
                    Back
                </button>
            </div>

            <div>
                <button
                    style={{
                        background: "green",
                        position: "absolute",
                        transform: `translate(${
                            headerx + (header_width * 6) / 7
                        }px, ${headery}px)`,
                        width: header_width / 7,
                        height: header_height,
                        fontSize: 20
                    }}
                    onClick={() => IncreaseMonth(1)}
                >
                    {" "}
                    Forw
                </button>
            </div>

            {[0, 1, 2, 3, 4, 5].map((num) => (
                <div key={num}>
                    <Link
                        to={
                            "/calendar/week/" + linkString(displaydays[num * 7])
                        }
                    >
                        <button
                            style={{
                                background: "#ADD8E6",
                                position: "absolute",
                                transform: `translate(${
                                    calendarx - header_width / 10
                                }px, ${calendary + num * 124}px)`,
                                width: header_width / 10,
                                height: 124,
                                fontSize: 16
                            }}
                        >
                            <p>
                                W<br />
                                E<br />
                                E<br />
                                K<br />
                                {num}
                            </p>
                        </button>
                    </Link>
                </div>
            ))}

            {[
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                34, 35, 36, 37, 38, 39, 40, 41
            ].map((num) => (
                <CalendarSquare
                    key={num}
                    num={num}
                    date={displaydays[num]}
                    event0={events0[num]}
                    color0={eventcolors0[num]}
                    event1={events1[num]}
                    color1={eventcolors1[num]}
                    event2={events2[num]}
                    color2={eventcolors2[num]}
                    month={month}
                    cx={calendarx}
                    cy={calendary}
                    weekdays={weekdays}
                />
            ))}
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                <Link to="/taskList">
                    <Button variant="success">Back to task list</Button>
                </Link>
            </div>
        </div>
    );
};

export default CalMonth;
