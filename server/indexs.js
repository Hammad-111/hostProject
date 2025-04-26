const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const RoomModel = require("./models/Room");

const app = express();
app.use(express.json());
app.use(cors());

// --- MongoDB Atlas Connection ---
// IMPORTANT: yahan database name 'cardiology' hai
mongoose.connect("mongodb+srv://ammar:ammar786@atlascluster.8drgp.mongodb.net/cardiology") 
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('MongoDB connection error:', error));

// --- LOGIN API ---
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await EmployeeModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No Record Exist" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Password is Incorrect" });
        }

        res.status(200).json({ message: "Success" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// --- REGISTER API ---
app.post('/register', async (req, res) => {
    try {
        const newUser = await EmployeeModel.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});

// --- ADD ROOM API ---
app.post('/addRoom', async (req, res) => {
    try {
        const { name } = req.body;
        const newRoom = new RoomModel({ name });
        await newRoom.save();
        res.status(201).json({ message: "Room added successfully", room: newRoom });
    } catch (error) {
        res.status(500).json({ message: "Error adding room", error });
    }
});

// --- DELETE ROOM API ---
app.delete('/deleteRoom/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRoom = await RoomModel.findByIdAndDelete(id);
        if (!deletedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting room", error });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
