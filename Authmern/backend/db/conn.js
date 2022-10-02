const mongoose = require("mongoose")


mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("connection done with mongoDB")
}).catch((err)=>{
console.log("error",err)
})