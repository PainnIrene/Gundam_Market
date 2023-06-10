import express from  'express';
import *as dotenv from 'dotenv';
dotenv.config();
import {v2 as cloudinary} from 'cloudinary';
const router= express.Router();
//config cloudinary
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
  
  });







export default router;
