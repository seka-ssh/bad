const mongoose=require('mongoose')
 
mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(()=>{
    console.log("Database connected successfully");
})
.catch(()=>{
    console.log("Database connection failed");
})

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }, 
     password:{
        type:String,
        required:true
    }
});
const collection=mongoose.model('collection1',UserSchema);
module.exports=collection;