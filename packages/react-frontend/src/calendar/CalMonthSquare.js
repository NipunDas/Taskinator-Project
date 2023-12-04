import React from "react";
import { Link } from "react-router-dom";

const CalMonthSquare = (props) => {
    /* HELPER FUNCTIONS */
    //Trunacte Function
    function truncate(str, maxlength) {
        if (str.length > maxlength) {
            return str.slice(0, maxlength - 1) + "…";
        } else return str;
    }

    //Convert Date to String For Linking
    function linkString(linkDate) {
        const linkYear = linkDate.getFullYear();
        const linkMonth = linkDate.getMonth() + 1;
        const linkDay = linkDate.getDate();
        return linkYear + "-" + linkMonth + "-" + linkDay;
    }

    //Constants (Controls Width and Height of all calendar squares)
    const height = 124;
    const width = 160;
    const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    //Inputs
    const num = props.num;           //Determines position of square
    var isTop = false;               //Determines if square is on top to Display Weekday
    if (num < 7) isTop = true;

    //Calculates position of square based on calendar position and num
    const calendarx = props.cx;
    const calendary = props.cy;
    const x_pos = width * (num % 7) + calendarx;
    const y_pos = height * Math.floor(num / 7) + calendary;

    //Thing to display on header
    const date = props.date;

    //Grey Out All Days Not In The Current Month
    var titlecolor = "white";
    if (props.month !== date.getMonth()) titlecolor = "#d3d3d3";

    //Holds the event data, 3 events can be displayed per square
    var event = new Array(3);
    var hasev = new Array(3);
    var color = new Array(3);

    //Event1
    hasev[0] = false;
    if (props.event0 !== undefined && props.event0 !== "") {
        event[0] = truncate(props.event0, 12);
        hasev[0] = true;
    }
    color[0] = props.color0;

    //Event2
    hasev[1] = false;
    if (props.event1 !== undefined && props.event1 !== "") {
        event[1] = truncate(props.event1, 12);
        hasev[1] = true;
    }
    color[1] = props.color1;

    //Event3
    hasev[2] = false;
    if (props.event2 !== undefined && props.event2 !== "") {
        event[2] = truncate(props.event2, 12);
        hasev[2] = true;
    }
    color[2] = props.color2;

    return (
        <div className="CalendarSquare">
            <div
                style={{
                    background: titlecolor,
                    position: "absolute",
                    transform: `translate(${x_pos}px, ${y_pos}px)`,
                    width: width,
                    height: height
                }}
            >
                <p
                    align="center"
                    style={{
                        fontSize: 16,
                        fontWeight: "bold"
                    }}
                >
                    {date.getDate()}
                </p>
            </div>

            {isTop && (
                <div
                    style={{
                        background: "white",
                        position: "absolute",
                        transform: `translate(${x_pos}px, ${
                            y_pos - (height * 1) / 4
                        }px)`,
                        border: "solid",
                        width: width,
                        height: (height * 1) / 4
                    }}
                >
                    <p
                        align="center"
                        style={{
                            fontSize: 16,
                            fontWeight: "bold"
                        }}
                    >
                        {weekdays[num]}
                    </p>
                </div>
            )}

            {hasev[0] && (
                <div
                    style={{
                        background: color[0],
                        position: "absolute",
                        transform: `translate(${x_pos + (width * 1) / 20}px, ${
                            y_pos + (height * (0 * 4 + 3)) / 16
                        }px)`,
                        border: "solid",
                        width: (width * 9) / 10,
                        height: (height * 1) / 5
                    }}
                >
                    <p
                        align="center"
                        style={{
                            fontSize: 16,
                            fontWeight: "bold"
                        }}
                    >
                        {event[0]}
                    </p>
                </div>
            )}

            {hasev[1] && (
                <div
                    style={{
                        background: color[1],
                        position: "absolute",
                        transform: `translate(${x_pos + (width * 1) / 20}px, ${
                            y_pos + (height * (1 * 4 + 3)) / 16
                        }px)`,
                        border: "solid",
                        width: (width * 9) / 10,
                        height: (height * 1) / 5
                    }}
                >
                    <p
                        align="center"
                        style={{
                            fontSize: 16,
                            fontWeight: "bold"
                        }}
                    >
                        {event[1]}
                    </p>
                </div>
            )}

            {hasev[2] && (
                <div
                    style={{
                        background: color[2],
                        position: "absolute",
                        transform: `translate(${x_pos + (width * 1) / 20}px, ${
                            y_pos + (height * (2 * 4 + 3)) / 16
                        }px)`,
                        border: "solid",
                        width: (width * 9) / 10,
                        height: (height * 1) / 5
                    }}
                >
                    <p
                        align="center"
                        style={{
                            fontSize: 16,
                            fontWeight: "bold"
                        }}
                    >
                        {event[2]}
                    </p>
                </div>
            )}
            <div>
                <Link to={"/day/" + linkString(date)}>
                    <button
                        style={{
                            background: "transparent",
                            position: "absolute",
                            transform: `translate(${x_pos}px, ${y_pos}px)`,
                            border: "solid",
                            borderTop: "none",
                            width: width,
                            height: height,
                            fontSize: 20,
                            color: "black"
                        }}
                        onClick={() => console.info(date)}
                    ></button>
                </Link>
            </div>
        </div>
    );
};

export default CalMonthSquare;
