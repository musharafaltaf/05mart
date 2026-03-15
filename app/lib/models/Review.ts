import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({

productId:String,

userId:String,

orderId:String,

rating:Number,

comment:String,

images:{
type:[String],
default:[]
}

},{timestamps:true});

export default mongoose.models.Review ||
mongoose.model("Review",ReviewSchema);