const mongoose = require("mongoose");
const connection_string = "mongodb+srv://wizidsaad5:wizidsaad5@store-management.v6a4mdk.mongodb.net/store-management-db?retryWrites=true&w=majority&appName=store-management";

mongoose.connect(connection_string, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log("DB CONNECTED...")).catch((error) => console.log(error.message))