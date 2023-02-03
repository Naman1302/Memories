import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    creator : String,
    title : String,
    caption : String,
    tags : [String],
    fileSelected : String,
    likes : {
        type :Number,
        default : 0
    },
    createdAt : {
        type : Date,
        default : new Date()
    }
});

const Post= mongoose.model("Post",postSchema);
export default Post;