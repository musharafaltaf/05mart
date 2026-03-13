import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
{
productId:{
type:String,
required:true
},

rating:{
type:Number,
required:true
},

comment:{
type:String,
required:true
}

},
{ timestamps:true }
);

const Review =
mongoose.models.Review ||
mongoose.model("Review",ReviewSchema);

export default Review;