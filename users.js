const mongoose = require('mongoose')

const users = new mongoose.Schema({
    fname:{
        type:String,
    },
    lname:{
        type:String,
    },
    mobile:{
        type:String,
    },
    description:{
        type:String
    }
})

const usersList = mongoose.model("users",users)

module.exports = usersList;