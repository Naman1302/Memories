import express from 'express';
import mongoose from 'mongoose';

import Post from '../models/post.js';

const getPosts= async (req,res) => {
    try {
        const posts=await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.send(404).json({ message : error.message});
    }
}

const createPost= async (req,res) => {
    const data = req.body;
    const newPost= new Post(data);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.send(404).json({message : error.message});
    }
}

const updatePost = async (req,res) => {
    const { id :_id } = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post exixts with this id");
        
    const updatedPost = await Post.findByIdAndUpdate(_id, { ... post, _id}, {new: true});
    
    res.json(updatedPost);
}

const deletePost = async (req,res) =>{
    const {id} =req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Dosen't exist!!!");
    await Post.findByIdAndRemove(id);
    console.log("DELETED!!");
    res.json({messgae: "Post Deleted Sucessfully"});
}

const likePost = async(req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Post Dosen't exist!!!");
    const fetchPost=await Post.findById(id);
    const updatedPost = await Post.findByIdAndUpdate(id, {likes: fetchPost.likes+1}, {new :true});
    console.log("LIKED!!!");
    res.json(updatedPost);
}
export {getPosts, createPost, updatePost, deletePost, likePost} ;