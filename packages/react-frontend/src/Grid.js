import React, {useEffect, useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./styles.css";

const initialData = {
    high: [
        { id: 'high-1', description: 'Finish Science', name: 'Science Homework '},
        { id: 'high-2', description: 'Go To Work', name: 'Finish Work '},
        { id: 'high-3', description: 'Finish Science', name: 'Science Homework '},
        { id: 'high-4', description: 'Math HW4', name: 'a ' },

    ],
    medium: [
        { id: 'medium-1', description: 'English HW', name: 'b ' },
        { id: 'medium-2', description: 'English HW 3', name: 'c ' },

    ],
    low: [
        { id: 'low-1', description: 'Go To Work', name: 'd ' },
        { id: 'low-2', description: 'Attend Meeting', name: 'e ' },
    ]
};

const testData = {
    high: [
        { description: "Finish Science", name: "Science Homework", priority: 1, tags: ['School'], _id: "655404fb657f32d7a343f97a"},
        { description: "work out", name: "Go To Gym", priority: 1, tags: ['All','Personal'], _id: "655404fb657f32d7a343f97d"}
    ],
    medium: [
        { description: "Finish English", name: "English Homework", priority: 2, tags: ['School'], _id: "655404fb657f32d7a343f97b"}
    ],
    low: [
        {description: "Finish Work", name: "Go To Work", priority: 3, tags: ['Work'], _id: "655404fb657f32d7a343f97c" },
    ]
};

function DragAndDropComponent(props) {
    // const [data, setData] = useState(testData);

    const [list, setList] = useState({
        high: [],
        medium: [],
        low: [],
    });

    useEffect(() => {
        const newList = {
            high: props.taskData.filter(task => task.priority === 1).map(({ _id, ...rest }) => ({ ...rest, id: _id })),
            medium: props.taskData.filter(task => task.priority === 2).map(({ _id, ...rest }) => ({ ...rest, id: _id })),
            low: props.taskData.filter(task => task.priority === 3).map(({ _id, ...rest }) => ({ ...rest, id: _id })),
        };

        setList(newList);
        console.log("Updated list:", newList);
    }, [props.taskData]);



    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        console.log("source.droppableId: " + source.droppableId);
        console.log("destination.droppableId: " + destination.droppableId);

        const start = list[source.droppableId]; //TODO  UPDATE
        const finish = list[destination.droppableId]; //TODO  UPDATE

        if (start === finish) {
            const newList = Array.from(start);
            const [removed] = newList.splice(source.index, 1);
            newList.splice(destination.index, 0, removed);

            const newData = { ...list, [source.droppableId]: newList }; //TODO  UPDATE
            setList(newData); //TODO  UPDATE
            return;
        }

        // Moving from one list to another
        const startTasks = Array.from(start);
        const finishTasks = Array.from(finish);
        const [removed] = startTasks.splice(source.index, 1);

        finishTasks.splice(destination.index, 0, removed);

        const newData = {
            ...list, //TODO  UPDATE
            [source.droppableId]: startTasks,
            [destination.droppableId]: finishTasks,
        };

        setList(newData); //TODO  UPDATE
    };

    console.log("what is the list?    ");
    console.log(list);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {Object.keys(list).map((listKey) => ( //TODO  UPDATE
                <Droppable droppableId={listKey} key={listKey}>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="list">
                            <h3>{listKey.charAt(0).toUpperCase() + listKey.slice(1)} Priority</h3>
                            {list[listKey].map((item, index) => ( //TODO  UPDATE
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="item">
                                            {item.description}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ))}
        </DragDropContext>
    );
}

export default DragAndDropComponent;

