import express from  'express';
import *as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import userRoute from './routes/userRoute.js'
import postRoute from './routes/postRoutes.js'
import session  from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local'
import passportlocalMongoose from 'passport-local-mongoose'
import User from './mongodb/models/user.js'
const PORT="5000"
 const PATH=process.env.MONGODB_URL;
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use('/user',userRoute)
app.use('/post',postRoute)
app.set("view engine", "ejs");

app.use(session({
    secret: "CLOUD COMPUTING",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get('/',async(req,res)=>{
    res.send("Welcome backEnd");
    
    })

const startSever= async()=>
{
    try {
        connectDB(PATH)
app.listen(PORT,()=>console.log('Sever has started on port '+ PORT))

    } catch (error) {
        console.log(error);
    }

}
startSever();