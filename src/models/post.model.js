import mongoose from "mongoose"

const postSchema=new mongoose.Schema(
   {
       imageUrl:{
           type:String,
           required:true
       },
    caption:{
        type:String,
        required:true
    },
},
{
    timestamps:true
}

)
const postModel=new mongoose.model("post",postSchema)
export default postModel;
