import mongoose from "mongoose";

const TaskListSchema = new mongoose.Schema(
    {
        tasks: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true
                },
                description: {
                    type: String,
                    required: false,
                    trim: false
                },
                tags: {
                    type: [String],
                    required: false,
                    trim: true
                },
                priority: {
                    type: Number,
                    required: true,
                    trim: true
                },
                date: {
                    type: Date,
                    required: false
                },
                duration: {
                    type: Number,
                    required: false
                }
            }
        ]
    },
    { collection: "tasklist_collection" }
);

const Task = mongoose.model("Task List", TaskListSchema);

export default Task;