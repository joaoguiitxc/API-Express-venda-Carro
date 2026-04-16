import express from "express"
import dotenv from "dotenv"
import mongoose, { mongo } from "mongoose"
import Car from "./Car.js";
import User from "./user.js";
import Sale from "./sale.js";

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

//USERS CREATE

//1-CREATE
app.post("/users", async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.json(newUser);
    } catch (error) {
        res.json({ error: error.menssage });
    }

})

//2-LIST
app.get("/users", async (req, res) => {
    try {
        const Users = await User.find();
        res.json(Users)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//3-LIST ID
app.get("/users/:id", async (req, res) => {
    try {
        const searchForUserByID = await User.findById(req.params.id);
        res.json(searchForUserByID);
    } catch (error) {
        res.json({ error: error.message })
    }
})

//4-SUBST
app.put("/users/:id", async (req, res) => {
    try {
        const userUpdate = await User.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        req.params.id,
            res.json(userUpdate);
    } catch (error) {
        res.json({ error: error.message })
    }
})

//5-DELETE
app.delete("/users/:id", async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.json(deleteUser);
    } catch (error) {
        res.json({ error: error.message });
    }
})

//6-SEARCH FOR USER BY ID
app.get("/users/email/:email", async (req, res) => {
    try {
        const userEmail = await User.findOne({ email: req.params.email });
        res.json(userEmail);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//7-NUMBER OF REGISTERED USERS
app.get("/users-count", async (req, res) => {
    try {
      const total = await User.countDocuments();
      res.json({ total });
    } catch (error) {-
      res.json({ error: error.message });
    }
});

//8-UPDATE USERNAME ONLY
app.patch("/users/:id/:name", async (req, res) => {
    try {
        const nameUpdate = await User.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        res.json(nameUpdate);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//9-CHECK EMAIL
app.get("/users-exists/:email", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
      res.json({ exists: !!user});
    } catch (error) {
      res.json({ error: error.message });
    }
  });

//10-SEARCH FOR USERS BY NAME
app.get("/users/name/:name", async (req, res) => {
    try {
        const userName = await User.find({ name: req.params.name });
        res.json(userName);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//11-DELETE ALL USERS 
app.delete("/users", async (req, res) => {
    try {
        const deleteAllUsers = await User.deleteMany();
        res.json(deleteAllUsers);
    } catch (error) {
        res.json({ error: error.message });
    }
})

//SALE CREATE

//1-CREATE
app.post("/sale", async (req, res) => {
    try {
        const newSale = await Sale.create(req.body)
        res.json(newSale);
    } catch (error) {
        res.json({ error: error.menssage });
    }

})

//2-LIST
app.get("/sale", async (req, res) => {
    try {
        const saleList = await Sale.find();
        res.json(saleList)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//3-LIST ID
app.get("/sale/:id", async (req, res) => {
    try {
        const searchForSaleByID = await Sale.findById(req.params.id);
        res.json(searchForSaleByID);
    } catch (error) {
        res.json({ error: error.message })
    }
})

//4-SUBST
app.put("/sale/:id", async (req, res) => {
    try {
        const saleUpdate = await Sale.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        req.params.id,
            res.json(saleUpdate);
    } catch (error) {
        res.json({ error: error.message })
    }
})

//5-DELETE
app.delete("/sale/:id", async (req, res) => {
    try {
        const deleteSale = await Sale.findByIdAndDelete(req.params.id);
        res.json(deleteSale);
    } catch (error) {
        res.json({ error: error.message });
    }
})

//6-SEARCH FOR SALE BY ID
app.get("/sale/user/:userId", async (req, res) => {
    try {
        const userSale = await Sale.findOne({ user: req.params.user });
        res.json(userSale);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//6-SEARCH FOR SALE BY ID
app.get("/sale/car/:carId", async (req, res) => {
    try {
        const carSale = await Sale.findOne({ car: req.params.car });
        res.json(carSale)
    } catch (error) {
        res.json({ error: error.message });
    }
});

//8-UPDATE STATUS SALE ONLY
app.patch("/sale/:id/:status", async (req, res) => {
    try {
        const statusUpdate = await Sale.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        res.json(statusUpdate);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//9-SEARCH FOR USERS BY NAME
app.get("/sale/salevalue/:min/:max", async (req, res) => {
    try {
        const searchForSalesByValue = await Sale.find({ sale: req.params.sale });
        res.json(searchForSalesByValue);
    } catch (error) {
        res.json({ error: error.message });
    }
});
//10-SEARCH FOR USERS BY NAME
app.get("/users/name/:name", async (req, res) => {
    try {
        const userName = await User.find({ name: req.params.name });
        res.json(userName);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//10-SEARCH FOR SALE BY DATE
app.get("/sale/saleDate/:saleDate", async (req, res) => {
    try {
        const saleDate = await Sale.find({ sale: req.params.sale });
        res.json(saleDate);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//11-TOTAL AMOUNT OF SALES
app.get("/sale-count", async (req, res) => {
    try {
      const total = await Sale.countDocuments();
      res.json({ total });
    } catch (error) {-
      res.json({ error: error.message });
    }
});









app.listen(PORT, () =>
    console.log("O servidor está rodando na porta: ", PORT)
)


