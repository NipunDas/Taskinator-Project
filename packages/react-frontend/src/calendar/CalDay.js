import React, { useState, useEffect } from "react";
import CalWeekSquare from "./CalWeekSquare";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { API_URL } from "../Consts.js";

/*
Calendar Day 

To add events, place parameters in the following arrays
titles = Title of the event
times = Time of the event
durations = Duration of event (In minutes)
descriptions = Description of the event
colors = Color of the event on the calendar

All arrays are assumed to be in same order
*/
const CalWeek = (props) => {
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

    //HELPER FUNCTIONS
    //Converts an hour (0-24) into a string (ie 0 to "12 AM")
    function hourtoString(num) {
        const hour = hourbegin + num;
        if (hour === 0) return "12 AM";
        else if (hour < 12) return hour + "AM";
        else if (hour === 12) return hour + "PM";
        else return hour - 12 + "PM";
    }

    //Increases (And decreases) the week
    function IncreaseDay(num) {
        setDate(new Date(year, month, dayDate + num));
    }

    //Convert Date to String For Creating Links To Other Calendars
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
    function addTask(task, addDate){
        var y = 0;
        //Find Open Space In The Array
        while (titles[y] != null) {
            y += 1;
        }
        titles[y] = task["name"];
        times[y] = addDate.getHours() * 60 + addDate.getMinutes();
        durations[y] = task["duration"];
        descriptions[y] = task["description"];
        colors[y] = samplecolors[colorindex];
        colorindex += 1;
        if (colorindex >= 7) colorindex = 0;
    }

    //Constants
    const [tasks, setTasks] = useState([]);
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

    //Obtaining Date Information
    //Note: Assumes the date in the url is a valid date
    let params = useParams();
    var pstDate = params["newdate"] + " PST";
    var [date, setDate] = useState(new Date(pstDate));
    var month = date.getMonth();
    var dayDate = date.getDate();
    var year = date.getFullYear();

    const maxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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

    // To indicate API call failed
    if (!tasks) {
        return <caption>Data Unavailable</caption>;
    }

    //Design Parameters
    //Header
    const headerx = 250;
    const headery = 25;
    const header_width = 800;
    const header_height = 60;

    //Calendar Position
    const calendarx = 90;
    const calendary = 200;

    //Hours and Time
    const hourbegin = 0; //What hour the daily calendar begins at
    const hourend = 24; //What hour the daily calendar ends at
    const hourwidth = 1120; //Width of each hour block
    const timewidth = 80; //Width of the left hour markers blocks

    //Create schedule background
    const totalhours = hourend - hourbegin;
    const forarray = new Array(totalhours);
    for (var i = 0; i < totalhours; i++) {
        forarray[i] = i;
    }

    //Constant Calendar Height Code:
    //const calendarheight = 1000; //Height of total calendar
    //const hourheight = Math.floor(calendarheight / totalhours);

    //Constant Hour Height Code:
    const hourheight = 75; //Height of each hour block
    const calendarheight = hourheight * totalhours;

    //Declare Event Arrays
    var titles = [];
    var times = [];
    var durations = [];
    var descriptions = [];
    var colors = [];

    //Find Events To Place In Calendar
    const samplecolors = ["red", "orange", "yellow", "green", "blue", "purple"];
    var colorindex = 0;
    for (var j = 0; j < tasks.length; j++) {
        var task = tasks[j];
        //Tasks without names or dates cannot be placed
        if (!task["name"] || !task["date"]) continue;
        var s = task["date"];
        //Converts UTC Date to Local Time
        var startDate = new Date(s.replace(/-/g, "/").replace("T", " "));
        //Ensure Task Is Actually A Part Of The Day
        if (sameDay(new Date(startDate), date)) addTask(task, startDate);
        var periodic = task["periodic"];
        if(periodic != null && periodic !== ""){
            switch (periodic[0]) {
            //Daily
            case "D":
                if(date > startDate){
                    addTask(task, startDate);
                }
                break;
            //Every Other Day
            case "O":
                if(date > startDate 
                    && Math.ceil((date.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) % 2 === 0){
                    addTask(task, startDate);                            
                }
        
                break;
            //Every Week
            case "W":
                var pWeekday = [];
                for(let i = 1; i < periodic.length; i++){
                    if(periodic[i] === "1")pWeekday.push(i - 1);
                }
                if(date > startDate 
                    && pWeekday.includes(date.getDay())){
                    addTask(task, startDate);
                }
            
                break;
            //Every Month
            case "M":
                if(date > startDate){
                    //In the case that the date is outside the range of the current month, place event at end of month
                    if(startDate.getDate() > maxDays[date.getMonth()] && date.getDate() === maxDays[date.getMonth()] ){
                        addTask(task, startDate);
                    }
                    else if(date.getDate() === startDate.getDate()){
                        addTask(task, startDate);
                    }
                }
                
                break;
                //Every Year
            case "Y":
                if(date > startDate){
                    if(startDate.getDate() === date.getDate() && startDate.getMonth() === date.getMonth()){
                        addTask(task, startDate);
                    }
                    //Event On Leap Day
                    else if(startDate.getMonth() === 1 
                        && startDate.getDate() === 29 
                        && date.getMonth() === 1
                        && date.getDate() === 28
                        && maxDays[1] === 28){
                        addTask(task, startDate);              
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
                    {months[date.getMonth()] +
                        " " +
                        date.getDate() +
                        ", " +
                        date.getFullYear()}
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
                    onClick={() => IncreaseDay(-1)}
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
                    onClick={() => IncreaseDay(1)}
                >
                    {" "}
                    Forw
                </button>
            </div>
            <div>
                <Link to={"/calendar/week/" + linkString(date)}>
                    <button
                        style={{
                            background: "Black",
                            position: "absolute",
                            transform: `translate(${0}px, ${0}px)`,
                            width: 100,
                            height: header_height + headery,
                            fontSize: 20
                        }}
                    >
                        {" "}
                        To Week
                    </button>
                </Link>
            </div>
            <div
                style={{
                    background: "white",
                    position: "absolute",
                    transform: `translate(${
                        calendarx - timewidth
                    }px, ${calendary}px)`,
                    border: "solid",
                    borderTop: "none",
                    width: timewidth,
                    height: hourheight * totalhours
                }}
            />
            {forarray.map((num) => (
                <div
                    key={num}
                    style={{
                        background: "#ADD8E6",
                        position: "absolute",
                        transform: `translate(${calendarx - timewidth}px, ${
                            calendary + num * hourheight
                        }px)`,
                        border: "solid",
                        borderBottom: "none",
                        width: timewidth,
                        height: hourheight / 2
                    }}
                >
                    <p
                        align="center"
                        style={{
                            fontSize: 16,
                            fontWeight: "bold"
                        }}
                    >
                        {hourtoString(num)}
                    </p>
                </div>
            ))}
            <CalWeekSquare
                num={0}
                date={date}
                x={calendarx}
                y={calendary}
                calheight={calendarheight}
                width={hourwidth}
                hourarray={forarray}
                hourheight={hourheight}
                totalhours={totalhours}
                begin={hourbegin}
                end={hourend}
                titles={titles}
                times={times}
                durations={durations}
                descriptions={descriptions}
                colors={colors}
            />
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                <Link to="/taskList">
                    <Button variant="success">Back to task list</Button>
                </Link>
            </div>
        </div>
    );
};

export default CalWeek;
