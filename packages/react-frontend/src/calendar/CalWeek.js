import React, { useState, useEffect } from "react";
import CalWeekSquare from "./CalWeekSquare";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { API_URL } from "../Consts.js";

/*
Calendar Week

To add events, place parameters in the following 2D arrays
titles = Title of the event
times = Time of the event
durations = Duration of event (In minutes)
descriptions = Description of the event
colors = Color of the event on the calendar
Each Entry Is An Array, so all of Sundays Events go In titles[0] etc
All arrays are assumed to be in same order
*/

const CalWeek = (props) => {
    const [tasks, setTasks] = useState([]);
    const addHeader = props.addHeader;
    const taskList = props.taskList;

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
                setTasks(null); // to indicate API call failed
                console.log(error);
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
    function IncreaseWeek(num) {
        setDate(new Date(year, month, dayDate + 7 * num));
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
    function addTask(task, addDate, i) {
        var y = 0;
        //Find Open Space In The Array
        while (titles[i][y] != null) {
            y += 1;
        }
        titles[i][y] = task["name"];
        times[i][y] = addDate.getHours() * 60 + addDate.getMinutes();
        durations[i][y] = task["duration"];
        descriptions[i][y] = task["description"];
        colors[i][y] = samplecolors[colorindex];
        colorindex += 1;
        if (colorindex >= 7) colorindex = 0;
    }

    // Constants
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
    var day = date.getDay();
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

    //Calculate currrent week
    var datearr = new Array(7);
    datearr[0] = new Date(year, month, dayDate - day);
    for (let i = 1; i < 7; i++) {
        datearr[i] = new Date(year, month, dayDate - day + i);
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
    const hourbegin = 0; //What hour the weekly calendar begins at
    const hourend = 24; //What hour the weekly calendar ends at
    const hourwidth = 160; //Width of each hour block
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

    //Declare Event Arrays (2D Arrays)
    var titles = new Array(7);
    var times = new Array(7);
    var durations = new Array(7);
    var descriptions = new Array(7);
    var colors = new Array(7);

    for (let i = 0; i < 7; i++) {
        titles[i] = [];
        times[i] = [];
        durations[i] = [];
        descriptions[i] = [];
        colors[i] = [];
    }

    //Find Events To Place In Calendar
    const samplecolors = [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "purple",
        "pink"
    ];
    var colorindex = 0;
    for (let j = 0; j < tasks.length; j++) {
        for (let i = 0; i < 7; i++) {
            var task = tasks[j];
            //Tasks without names or dates cannot be placed
            if (!task["name"] || !task["date"]) continue;
            var s = task["date"];
            //Converts UTC Date to Local Time
            var startDate = new Date(s.replace(/-/g, "/").replace("T", " "));
            //Ensure Task Is Actually A Part Of The Day
            if (sameDay(new Date(startDate), datearr[i]))
                addTask(task, startDate, i);
            var periodic = task["periodic"];
            if (periodic != null && periodic !== "") {
                switch (periodic[0]) {
                    //Daily
                    case "D":
                        if (datearr[i] > startDate) {
                            addTask(task, startDate, i);
                        }
                        break;
                    //Every Other Day
                    case "O":
                        if (
                            datearr[i] > startDate &&
                            Math.ceil(
                                (datearr[i].getTime() - datearr[i].getTime()) /
                                    (1000 * 3600 * 24)
                            ) %
                                2 ===
                                0
                        ) {
                            addTask(task, startDate, i);
                        }

                        break;
                    //Every Week
                    case "W":
                        var pWeekday = [];
                        for (let i = 1; i < periodic.length; i++) {
                            if (periodic[i] === "1") pWeekday.push(i - 1);
                        }
                        if (
                            datearr[i] > startDate &&
                            pWeekday.includes(datearr[i].getDay())
                        ) {
                            addTask(task, startDate, i);
                        }

                        break;
                    //Every Month
                    case "M":
                        if (datearr[i] > startDate) {
                            //In the case that the date is outside the range of the current month, place event at end of month
                            if (
                                startDate.getDate() >
                                    maxDays[datearr[i].getMonth()] &&
                                datearr[i].getDate() ===
                                    maxDays[datearr[i].getMonth()]
                            ) {
                                addTask(task, startDate, i);
                            } else if (
                                datearr[i].getDate() === startDate.getDate()
                            ) {
                                addTask(task, startDate, i);
                            }
                        }

                        break;
                    //Every Year
                    case "Y":
                        if (datearr[i] > startDate) {
                            if (
                                startDate.getDate() === datearr[i].getDate() &&
                                startDate.getMonth() === datearr[i].getMonth()
                            ) {
                                addTask(task, startDate, i);
                            }
                            //Event On Leap Day
                            else if (
                                startDate.getMonth() === 1 &&
                                startDate.getDate() === 29 &&
                                datearr[i].getMonth() === 1 &&
                                datearr[i].getDate() === 28 &&
                                maxDays[1] === 28
                            ) {
                                addTask(task, startDate, i);
                            }
                        }

                        break;
                    default:
                        break;
                }
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
                    {months[datearr[0].getMonth()] +
                        " " +
                        datearr[0].getDate() +
                        " - " +
                        months[datearr[6].getMonth()] +
                        " " +
                        datearr[6].getDate()}
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
                    onClick={() => IncreaseWeek(-1)}
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
                    onClick={() => IncreaseWeek(1)}
                >
                    {" "}
                    Forw
                </button>
            </div>

            <div>
                <Link to={"/calendar/month/" + linkString(datearr[3])}>
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
                        To Month
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

            {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                <CalWeekSquare
                    key={num}
                    num={num}
                    date={datearr[num]}
                    x={calendarx}
                    y={calendary}
                    calheight={calendarheight}
                    width={hourwidth}
                    hourarray={forarray}
                    hourheight={hourheight}
                    totalhours={totalhours}
                    begin={hourbegin}
                    end={hourend}
                    titles={titles[num]}
                    times={times[num]}
                    durations={durations[num]}
                    descriptions={descriptions[num]}
                    colors={colors[num]}
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

export default CalWeek;
