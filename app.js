const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({extended: true}))
app.use("/api/v3/app", require("./routers/events"));


app.listen(3000,()=>{
    console.log("Listening to port 3000");
});
