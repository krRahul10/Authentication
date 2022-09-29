require("./db/conn")
const express = require("express")
const router = require('./routes/router')
const cors = require("cors")

const app = express()

const port = 8080


app.use(express.json())
app.use(cors())
app.use(router)

// app.get("/",(req,res) => {
//     res.status(201).json("sever created")
// })

app.listen(port , ()=>{
    console.log(`server started at : ${port}` )
})