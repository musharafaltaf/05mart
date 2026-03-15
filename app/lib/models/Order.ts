// import mongoose from "mongoose";

// const OrderSchema = new mongoose.Schema(
// {
//   userId: {
//     type: String,
//     default: "guest"
//   },

//   items: [
//     {
//       productId: String,
//       name: String,
//       price: Number,
//       oldPrice: Number,
//       image: String,
//       quantity: Number
//     }
//   ],

//   total: {
//     type: Number,
//     required: true
//   },

//   customer: {
//     name: String,
//     phone: String,
//     address: String,
//     city: String,
//     zip: String
//   },

//   paymentMethod: String,

//   status: {
//     type: String,
//     default: "placed"
//   }

// },
// { timestamps: true }
// );

// const Order =
//   mongoose.models.Order ||
//   mongoose.model("Order", OrderSchema);

// export default Order;

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

userId:String,

items:Array,

total:Number,

customer:Object,

paymentMethod:String,

paymentProof:String,

status:{
type:String,
default:"pending"
},

tracking:[
{
status:String,
date:Date
}
],

returnStatus:{
type:String,
default:null
},

refundStatus:{
type:String,
default:null
},

reviewGiven:{
type:Boolean,
default:false
}

},{
timestamps:true
});

export default mongoose.models.Order ||
mongoose.model("Order",OrderSchema);