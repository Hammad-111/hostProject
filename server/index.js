const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const RoomModel = require("./models/Room");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://ammar:ammar786@atlascluster.8drgp.mongodb.net/cardiology") 
// --- Login API ---
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

// --- FORGOT PASSWORD API ---
app.post('/password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await EmployeeModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No user found with this email." });
        }

        // Temporary password reset link ya message bhejna
        // Simple example (normally reset token banate hain, abhi simple rakhte hain)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hammadjaveed21@gmail.com',    // <-- apna email
                pass: 'jzbx mjfk nvpo ckcu',        // <-- Gmail app password use karna (not real gmail password)
            },
        });

        const mailOptions = {
            from: 'hammadjaveed21@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: 'You requested to reset your password. Please click the link to reset your password: http://yourfrontend.com/reset-password', 
            // Note: Yahan real reset link dal sakte ho baad mein.
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password reset link has been sent to your email." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending reset email", error });
    }
});

app.listen(3001, ()=>{
    console.log("server is running");
})
