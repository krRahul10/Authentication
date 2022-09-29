const mongoose = require("mongoose")

const DB="mongodb+srv://Octopus:octopus@cluster0.fmfphvh.mongodb.net/Authusers?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("connection done with mongoDB")
}).catch((err)=>{
console.log("error",err)
})