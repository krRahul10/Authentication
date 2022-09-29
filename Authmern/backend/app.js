const express = require("express")
require("./db/conn")

const app = express()

const port = 8080

app.get("/",(req,res) => {
    res.status(201).json("sever created")
})

app.listen(port , ()=>{
    console.log(`server started at : ${port}` )
})