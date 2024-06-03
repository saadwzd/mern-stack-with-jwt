const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    nom:{type:String, required:true},
    cin:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    tel:{type:String, required:true},
})

const clients = new mongoose.model("clients",clientSchema);
module.exports = clients;