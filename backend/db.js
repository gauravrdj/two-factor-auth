require('dotenv').config();
const mongoose = require('mongoose');

try{
  mongoose.connect(process.env.DATABASE_URL);
  console.log("Database Connected");
}
catch(e){
    console.log("Error while connecting database");
}

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    enabled:{
        type:Boolean,
        default : false
    },
    secret : {
        type:String,
        default:""
    },

});
const user = mongoose.model('user', userSchema);

module.exports = {
    user,
}
