const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const mongoose=require("mongoose")



function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database is connected");
        })
        .catch((err) => {
            console.log("MongoDB connection error:", err);
            process.exit(1);
        });
}

module.exports=connectToDB