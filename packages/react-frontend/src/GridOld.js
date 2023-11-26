import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./styles.css";
import Card from 'react-bootstrap/Card';
//import { ListData } from "./list";

const initialData = {
    high: [
        { id: 'high-1', content: 'High Priority 1' },
        { id: 'high-2', content: 'High Priority 2' }
    ],
    medium: [
        { id: 'medium-1', content: 'Medium Priority 1' }
    ],
    low: [
        { id: 'low-1', content: 'Low Priority 1' },
        { id: 'low-2', content: 'Low Priority 2' }
    ]
};

function MultiListDragAndDrop(props) {
    // const [data, setData] = useState(initialData);
    const [list, setList] = useState({
        high: [],
        medium: [],
        low: [],
    });

    useEffect(() => {
        list.high = props.taskData.filter(task => task.priority === 1);
        list.medium = props.taskData.filter(task => task.priority === 2);
        list.low = props.taskData.filter(task => task.priority === 3);

        setList(list);
        console.log(list);
    }, [props.taskData]);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
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

        // Moving from one list to another
        const startTasks = Array.from(start);
        const finishTasks = Array.from(finish);
        const [removed] = startTasks.splice(source.index, 1);

        finishTasks.splice(destination.index, 0, removed);

        const newData = {
            ...list,
            [source.droppableId]: startTasks,
            [destination.droppableId]: finishTasks,
        };

        setList(newData);
    };





    return (
        <div>
            <h3>{props.name}</h3>
            <DragDropContext onDragEnd={onDragEnd}>
                {Object.keys(list).map((listKey) => (
                    <Droppable droppableId={listKey} key={listKey}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="list">
                                {list[listKey].map((item, index) => (
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
        </div>
    );
}

export default MultiListDragAndDrop;
