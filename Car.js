import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
    {
        model: String,
        brand: String,
        year: Number,
        clor: String,
        price: Number,
        available: Boolean,
        plate: String
    },
    { collection: "cars" }
);

export default mongoose.model("Car", CarSchema);