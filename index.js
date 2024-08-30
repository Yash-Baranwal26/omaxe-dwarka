const mongoose = require('mongoose');
const express = require('express');
const users = require('./users');
const cors = require('cors')

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://yashbaranwal121:yash2612@cluster0.c49ls.mongodb.net/omaxeDwarka?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log("DB Connected");
})                  
.catch(err => {
    console.log(err);
});

app.post("/userEnquiry", async (req, res) => {
    try {
        const { fname, lname, mobile, description } = req.body;

        let check = await users.findOne({ mobile: mobile });
        if (!check) {

            let send = await users.create({
                fname:fname,
                lname:lname,
                mobile:mobile,
                description:description
            });

            if (send) {
                res.status(200).json({ msg: "Your query is registered. We will contact you soon." });
            } else {
                res.status(400).json({ error: "Invalid arguments" });
            }
        } else {

            res.status(400).json({ error: "This number is already registered" });
        }
    } catch (err) {
        console.error('Error in /userEnquiry:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));