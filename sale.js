import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
    {
        userId: String,
        carId: String,
        saleValue: Number,
        patmentMethod: String,
        saleDate: Date,
        status: String,
        
    },
    { collection: "sale" }
);

export default mongoose.model("sale", saleSchema);