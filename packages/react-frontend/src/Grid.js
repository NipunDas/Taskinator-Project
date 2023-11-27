import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./styles.css";

function DragAndDropComponent(props) {
    const [list, setList] = useState({
        high: [],
        medium: [],
        low: []
    });

    useEffect(() => {
        const newList = {
            high: props.taskData
                .filter((task) => task.priority === 1)
                .map(({ _id, ...rest }) => ({ ...rest, id: _id })),
            medium: props.taskData
                .filter((task) => task.priority === 2)
                .map(({ _id, ...rest }) => ({ ...rest, id: _id })),
            low: props.taskData
                .filter((task) => task.priority === 3)
                .map(({ _id, ...rest }) => ({ ...rest, id: _id }))
        };

        setList(newList);
    }, [props.taskData]);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const start = list[source.droppableId];
        const finish = list[destination.droppableId];

        if (start === finish) {
            const newList = Array.from(start);
            const [removed] = newList.splice(source.index, 1);
            newList.splice(destination.index, 0, removed);

            const newData = { ...list, [source.droppableId]: newList };
            setList(newData);
            return;
        }

        const startTasks = Array.from(start);
        const finishTasks = Array.from(finish);
        const [removed] = startTasks.splice(source.index, 1);

        finishTasks.splice(destination.index, 0, removed);

        const newData = {
            ...list,
            [source.droppableId]: startTasks,
            [destination.droppableId]: finishTasks
        };

        setList(newData);

        props.updateTask(removed, destination.droppableId);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {Object.keys(list).map((listKey, index, array) => (
                <React.Fragment key={listKey}>
                    <div key={listKey} className="priority-section">
                        <h3>
                            {listKey.charAt(0).toUpperCase() + listKey.slice(1)}{" "}
                            Priority
                        </h3>
                        <Droppable droppableId={listKey} key={listKey}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="list"
                                >
                                    {list[listKey].map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="item"
                                                >
                                                    <Card
                                                        key={index}
                                                        className="mb-2 fixed-size-card"
                                                    >
                                                        <Card.Body>
                                                            <Card.Title>
                                                                {item.name}
                                                            </Card.Title>
                                                            <Card.Subtitle>
                                                                {
                                                                    item.description
                                                                }
                                                            </Card.Subtitle>
                                                            <Card.Text>
                                                                {item.tags.join(
                                                                    ", "
                                                                )}
                                                            </Card.Text>
                                                            <Button
                                                                variant="primary"
                                                                onClick={() =>
                                                                    props.removeTask(
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                Remove
                                                            </Button>
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    {index < array.length - 1 && <hr />}
                </React.Fragment>
            ))}
        </DragDropContext>
    );
}

export default DragAndDropComponent;
