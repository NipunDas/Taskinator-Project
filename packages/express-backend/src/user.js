import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        taskList: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    },
    { collection: "user_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;
