import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Droppable, Draggable, DragDropContext} from 'react-beautiful-dnd';
import {useEffect, useState} from "react";



function GridHeader(props) {
    return (
        <div>
            <hr />
            <h2 className="p-2">{props.name}</h2>
        </div>
    );
}

function GridBody(props) {
    return (
        <Container>
            <Row xs={2} md={4} lg={3}>
                {props.taskData?.map((task, index) => {
                    if (props.id === task.priority) {
                        return (
                            <Col key={index}>
                                <Card key={index} className="mb-2">
                                    <Card.Body>
                                        <Card.Title>{task.name}</Card.Title>
                                        <Card.Subtitle>
                                            {task.description}
                                        </Card.Subtitle>
                                        <Card.Text>{task.tags}</Card.Text>
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                props.removeTask(task._id)
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    }
                    return undefined;
                })}
            </Row>
        </Container>
    );
}

// function Grid(props) {
//     console.log("taskData:");
//     console.log(props);
//     return (
//         <div>
//             <GridHeader name={props.name} />
//             <GridBody
//                 id={props.id}
//                 taskData={props.taskData}
//                 removeTask={props.removeTask}
//             />
//         </div>
//     );
// }

const TaskCard = ({ task }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
            </div>
        </div>
    );
};

const TaskList = ({ tasks, priority }) => {
    console.log("priority = " + priority);
    return (
        <Droppable droppableId={priority}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <TaskCard task={task} />
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

const onDragEnd = (result) => {
    // Logic to reorder tasks when dragged and dropped
    // This involves updating the `tasks` state with the new order
};





function Grid(props) {

    const [tasks, setTasks] = useState({
        high: [],
        medium: [],
        low: [],
    });

    // const addTask = (newTask, priority) => {
    //     setTasks(prevTasks => {
    //         return {
    //             ...prevTasks,
    //             [priority]: [...prevTasks[priority], newTask]
    //         };
    //     });
    // };

    const addTask = (priorityKey, updatedTasks) => {
        const value = {title: "hellooooo", priority: "high"}
        setTasks({
            ...tasks,
            high: [...tasks.high, value]
        });

        console.log("Updated Task value ....");
        console.log(tasks.high);
    };

    const getTasks = () => {
        props.taskData?.map((task, index) => {
            console.log("props.id => " + props.id);
            console.log("task.priority => " + task.priority);
            if (props.id === task.priority) {
                switch (props.id) {
                    case 1:
                        console.log("H I G H");
                        console.log(props.taskData);

                        //const value = {title: "hellooooo", priority: "high"}
                        setTasks({
                            ...tasks,
                            high: [...tasks.high, props.taskData]
                        });

                        console.log("Updated Task value ....");
                        console.log(tasks.high);

                        //addTask("high", props.taskData);
                        break;
                    case 2:
                        console.log("M E D I U M");
                        console.log(props.taskData);
                        addTask( "medium", props.taskData);
                        break;
                    case 3:
                        console.log("L O W");
                        console.log(props.taskData);
                        addTask("low", props.taskData);
                        break;
                }
            }
        });
    }
    useEffect(() => {
        // const value = {title: "hellooooo", priority: "high"}
        // setTasks({
        //     ...tasks,
        //     high: [...tasks.high, value]
        // });

        getTasks();
        console.log("==================== TASKS ======================");
        console.log(tasks.high);
    },[props.taskData]);


    console.log("taskData:");
    console.log(tasks);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>{props.name}</h3>
                        <TaskList tasks={props.taskData} priority={props.id}/>
                    </div>
                    {/*<div className="col">*/}
                    {/*    <h3>Medium Priority</h3>*/}
                    {/*    <TaskList tasks={tasks.medium} priority="medium" />*/}
                    {/*</div>*/}
                    {/*<div className="col">*/}
                    {/*    <h3>Low Priority</h3>*/}
                    {/*    <TaskList tasks={tasks.low} priority="low" />*/}
                    {/*</div>*/}
                </div>
            </div>
        </DragDropContext>
    );
}

export default Grid;
