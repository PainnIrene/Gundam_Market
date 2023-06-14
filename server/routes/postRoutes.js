import { v2 as cloudinary } from 'cloudinary'
import *as dotenv from 'dotenv';
import Post from '../mongodb/models/post.js'
dotenv.config();

import express from 'express'
import { extractPublicId } from 'cloudinary-build-url'

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
api_key:process.env.CLOUDINARY_API_KEY,
api_secret:process.env.CLOUDINARY_API_SECRET,

});

const router= express.Router();

router.route('/upload').post(async(req,res)=>{
  try {
      const {name,description,price,photo}=req.body;

  const photoUrl=await cloudinary.uploader.upload(photo);
  
  const newPost= await Post.create({
     name,description,price,photo:photoUrl.url,
  })
  res.status(201).json({success:true});
  
  } catch (error) {
      res.status(500).json({success:false,message: 'Unable to create a post, please try again' })
  }
  });
//return post
router.route('/posts').get(async(req,res)=>{
  try {
      const posts=await Post.find({});
      res.status(200).json({success:true,data:posts.reverse()})

  } catch (error) {
      res.status(500).json({success:false,message:error})
      
  }
  
  });
//update
router.route('/update/:id').patch(async(req,res)=>{

try{
//delete image in cloudinary
const _id = req.params.id;
const findPost = await Post.findById(_id);
const imageUrl = findPost.photo;
if(req.body.photo!==imageUrl){
// Extract the public ID from the image URL
const publicId =  extractPublicId(imageUrl);

//Delete the image using the public ID
await cloudinary.uploader.destroy(publicId);

    //update
    const photoUrl = await cloudinary.uploader.upload(req.body.photo);
     req.body.photo = photoUrl.url;
    }
    

    await Post.findByIdAndUpdate(req.params.id, req.body,{new:true});



   res.status(200).json({success:true})

}catch(error){
  

res.status(500).json({success:false,message:error});
}

});
//delete

router.route('/delete/:id').delete(async (req, res) => {
  try {
    const _id = req.params.id;
    const findPost = await Post.findById(_id);
    const imageUrl = findPost.photo;
    // Extract the public ID from the image URL
    const publicId =  extractPublicId(imageUrl);

    //Delete the image using the public ID
   await cloudinary.uploader.destroy(publicId);

    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) res.status(404).send("No post found");
    res.status(200).send({message:"delete successful"});
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;


