import express from "express"
import dotenv from "dotenv"
import mongoose, { mongo } from "mongoose"
import Car from "./Car.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado com o MONGODB")
    } catch (error) {
        console.log("Erro: ", error);
    }
}

connectDB();

//CREATE
app.post("/cars", async (req, res) => {
    try {
        const newCars = await Car.create(req.body)
        res.json(newCars);
    } catch (error) {
        res.json({ error: error.menssage });
    }

})

//LIST
app.get("/Cars", async (req, res) => {
    try {
        const Cars = await Car.find();
        res.json(Cars)
    } catch (error) {
        res.json({ error: error.message })
    }
})
//LIST ID
app.get("/Cars/:id", async (req, res) => {
    try {
        const searchForCarByID = await Car.findById(req.params.id);
        res.json(searchForCarByID);
    } catch (error) {
        res.json({ error: error.message })
    }
})

//SUBST
app.put("/Cars/:id", async (req, res) => {
    try {
        const carUpdate = await Car.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        req.params.id,
            res.json(carUpdate);
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.delete("/Cars/:id", async (req, res) => {
    try {
        const deleteCar = await Car.findByIdAndDelete(req.params.id);
        res.json(deleteCar);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/Cars/brand/:brand", async (req, res) => {
    try {
        const carBrand = await Car.findOne({ brand: req.params.brand });
        res.json(carBrand);
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.get("/Cars/available/:available", async (req, res) => {
    try {
        const carAvailable = await Car.find({ available: req.params.available });
        res.json(carAvailable);
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.patch("/Cars/:id/available", async (req, res) => {
    try {
        const availableUpdate = await Car.findByIdAndUpdate(
            req.params.id,
            { available: req.body.available },
            { new: true }
        );
        res.json(availableUpdate);
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.get("/Cars/price/:min/:max", async (req, res) => {
    try {

        const minMaxPrice = await Car.find({ price:{ $gte: Number(req.params.min), $lte: Number(req.params.max) }
        });
        res.json(minMaxPrice);
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.get("/Cars/plate/:plate", async (req, res) => {
    try {
        const carPlate = await Car.find({ plate: req.params.plate });
        res.json(carPlate);
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.get("/Cars-count", async (req, res) => {
    try {
      const total = await Car.countDocuments();
      res.json({ total });
    } catch (error) {
      res.json({ error: error.message });
    }
});



app.listen(PORT, () =>
    console.log("O servidor está rodando na porta: ", PORT)
)
