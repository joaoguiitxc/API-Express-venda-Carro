import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        telephone: Number,
        password: String,
        age: Number,
        
    },
    { collection: "Users" }
);

export default mongoose.model("User", userSchema);