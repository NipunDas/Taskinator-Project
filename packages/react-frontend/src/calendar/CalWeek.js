import React, { useState, useEffect } from "react";
import CalWeekSquare from "./CalWeekSquare";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

//To add events, place paramters in the following 2D Arrays
//titles = Title of the event
//times = Time of the event
//durations = Duration of event (In minutes)
//descriptions = Description of the event
//colors = Color of the event on the calendar
//
//Each Entry Is An Array, so all of Sundays Events go In titles[0] etc
//All arrays are assumed to be in same order
const CalWeek = (props) => {
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

    /*
    function updateList(task) {
        setTasks([...tasks, task]);
    }
    */

    function sameDay(d1, d2) {
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    }

    // Constants
    const [tasks, setTasks] = useState([]);
    // const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

    //Obtaining Date Information
    //Note: Vulnerable to invalid dates
    let params = useParams();
    var pstDate = params["newdate"] + " PST";
    var [date, setDate] = useState(new Date(pstDate));
    var month = date.getMonth();
    var day = date.getDay();
    var dayDate = date.getDate();
    var year = date.getFullYear();

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

    //Calculate Current Week
    var datearr = new Array(7);
    datearr[0] = new Date(year, month, dayDate - day);
    for (let i = 1; i < 7; i++) {
        datearr[i] = new Date(year, month, dayDate - day + i);
    }
    console.info(datearr);

    //Header
    const headerx = 250;
    const headery = 25;
    const header_width = 800;
    const header_height = 60;

    //Calendar Position
    const calendarx = 90;
    const calendary = 200;
    const hourbegin = 0; //What hour the weekly calendar begins at
    const hourend = 24; //What hour the weekly calendar ends at
    const timewidth = 80;
    // const daywidth = 160;

    //Create schedule background
    const totalhours = hourend - hourbegin;
    const forarray = new Array(totalhours);
    for (let i = 0; i < totalhours; i++) {
        forarray[i] = i;
    }

    //Constant Calendar Height Code:
    //const calendarheight = 1000;
    //const hourheight = Math.floor(calendarheight / totalhours);

    //Constant Hour Height Code:
    const hourheight = 75;
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

    /* ADD EVENT GET CODE */
    const samplecolors = ["red", "orange", "yellow", "green", "blue", "purple"];
    /* ADD EVENT GET CODE */
    var colorindex = 0;
    for (let j = 0; j < tasks.length; j++) {
        for (let i = 0; i < 7; i++) {
            var task = tasks[j];
            if (!task["name"] || !task["date"]) continue;
            var s = task["date"];
            var startDate = new Date(s.replace(/-/g, "/").replace("T", " "));
            if (!sameDay(new Date(startDate), datearr[i])) continue;
            var y = 0;
            while (titles[i][y] != null) {
                y += 1;
            }
            titles[i][y] = task["name"];
            times[i][y] = startDate.getHours() * 60 + startDate.getMinutes();
            durations[i][y] = task["duration"];
            descriptions[i][y] = task["desc"];
            colors[i][y] = samplecolors[colorindex];
            colorindex += 1;
            if (colorindex >= 7) colorindex = 0;
        }
    }

    function fetchTasks() {
        const promise = fetch(
            "http://localhost:8000/task-lists/65553647a73a1b75066a47ab"
        );
        console.log(promise);
        return promise;
    }

    useEffect(() => {
        console.log("hi");
        fetchTasks()
            .then((res) => res.json())
            .then((json) => setTasks(json["tasks"]))
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                    align="justify"
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
                <Link to={"/month/" + linkString(datearr[3])}>
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
                        align="justify"
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
                    width={160}
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
