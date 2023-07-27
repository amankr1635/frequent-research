const express  = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./router/router");
const app = express()
app.use(express.json());
app.use(cors())
mongoose.connect("mongodb+srv://amankr1635:Zj318KOlnDXstxEY@cluster0.xmcvjnv.mongodb.net/")
.then(()=> console.log("mongoDB is connected"))
.catch((err)=>console.log(err.message))

app.use("/",routes)
const PORT = 8080

app.listen(PORT, ()=>{
    console.log("server is running on port "+ PORT)
})