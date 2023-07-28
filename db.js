const mongoose=require('mongoose');
// const URI='mongodb://localhost:27017/inote';
const URI2='mongodb+srv://vivek:viveksingh@cluster0.7jnnhcy.mongodb.net/app?retryWrites=true&w=majority'
const connectToMongo=()=>{
    mongoose.connect(URI2,()=>{
        console.log("connected to mongo successfully");
    })
}
module.exports=connectToMongo;