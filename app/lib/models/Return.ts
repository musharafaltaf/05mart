import mongoose from "mongoose";

const ReturnSchema = new mongoose.Schema({

orderId:String,

productId:String,

userId:String,

reason:String,

returnCharge:{
type:Number,
default:40
},

paymentStatus:{
type:String,
default:"pending"
},

status:{
type:String,
default:"requested"
}

},{timestamps:true});

export default mongoose.models.Return ||
mongoose.model("Return",ReturnSchema);