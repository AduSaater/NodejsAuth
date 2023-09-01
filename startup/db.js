const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const connectDB = async () =>{
   const  conn = await mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
   });
   console.log(`MongoDB Connected`);
}
module.exports = connectDB;