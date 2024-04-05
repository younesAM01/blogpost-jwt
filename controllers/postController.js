const postModel = require('../models/post');
const express = require("express");
const app = express();
app.use(express.json());



const creatpost = (req,res)=> {
    const {title, content} = req.body;
    const AuthorId = req.user.id;
    console.log(AuthorId, 'author id ');
    postModel.create({AuthorId,title,content})
    .then(()=>(res.send('post created succesfully')))
    
}

const getPost = (req, res) =>{
    postModel.find()
  .then((data)=>{
    res.send(data);
   });
}
const updatpost = async (req, res) => {
    try {
        const Post = await postModel.findOne({ title: req.params.title });

        if (!Post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (req.user.id !== Post.AuthorId) {
            return res.status(403).json({ message: 'You are not authorized to update this post' });
        }

        const updatedPost = await postModel.findOneAndUpdate({ title: req.params.title }, req.body, { new: true });
        res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const deletePost = async (req , res )=>{
    
    try {
        const post = await postModel.find({title : req.params.title});
        
        if (req.user.id === post.AuthorId){

            const deletedPost = await postModel.findOneAndDelete(req.params.title);
            if (!deletedPost) {
                return res.status(404).json({ msg: "No post found with the given id" });
            }
            return res.status(200).json("Post Deleted Successfully" );
        }
        else {
            return res.status(404).json({ msg: "you re not authorized" });
        }
        
    } catch (error) {
        return res.status(500).json("Internal Server Error" );
    }

 } 





module.exports = {creatpost,deletePost, getPost,updatpost};