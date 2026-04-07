import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({

userId:{
type:String,
required:true
},

message:{
type:String,
required:true
},

read:{
type:Boolean,
default:false
},

/* NEW */

productId:String,
productName:String,
productImage:String,

link:String,

createdAt:{
type:Date,
default:Date.now
}

});

export default mongoose.models.Notification ||
mongoose.model("Notification",NotificationSchema);