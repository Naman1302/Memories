import express from 'express';
import {getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/postcontrol.js'; 

const router   = express.Router();
//----view posts-----
router.get('/',getPosts);
//---create post-----
router.post('/',createPost);
//---update post-----
router.patch('/:id',updatePost);
//---delete post-----
router.delete('/:id',deletePost);
//----like post-----
router.patch('/:id/likePost', likePost);

export default router;