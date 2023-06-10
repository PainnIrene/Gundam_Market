import mongoose from "mongoose";
import passportLocalMongoose from'passport-local-mongoose';


const User= new mongoose.Schema(
{
    email:{type:String,required :true,unique:true},
password:{type:String,required :true},
full_name:{type:String,required :true},
posts:{type:Array}

}

);
User.plugin(passportLocalMongoose);
const UserSchema=mongoose.model('User',User);
export default UserSchema;