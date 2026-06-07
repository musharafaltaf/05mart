import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({

userId:{
type:String,
required:true,
index:true
},

message:{
type:String,
required:true
},

read:{
type:Boolean,
default:false
},

/* TYPE (NEW - FOR UI COLORS) */
type:{
type:String,
enum:["referral","order","reward","system"],
default:"system"
},

/* OPTIONAL PRODUCT DATA */
productId:String,
productName:String,
productImage:String,

/* REDIRECT LINK */
link:String,

createdAt:{
type:Date,
default:Date.now
}

},{ timestamps:true });

export default mongoose.models.Notification ||
mongoose.model("Notification",NotificationSchema);