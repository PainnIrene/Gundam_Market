import mongoose from "mongoose";


const Post= new mongoose.Schema(
{
    name:{type:String,required :true},
description:{type:String,required :true},
price:{type:String,required :true},
photo:{type:String, required :true}

}

);
const UserSchema=mongoose.model('Post',Post);
export default UserSchema;