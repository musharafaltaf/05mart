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

// import mongoose from "mongoose";

// const OrderSchema = new mongoose.Schema({

// userId:String,

// items:Array,

// total:Number,

// customer:Object,

// paymentMethod:String,

// paymentProof:String,

// status:{
// type:String,
// default:"pending"
// },

// tracking:[
// {
// status:String,
// date:Date
// }
// ],

// returnStatus:{
// type:String,
// default:null
// },

// refundStatus:{
// type:String,
// default:null
// },

// reviewGiven:{
// type:Boolean,
// default:false
// }

// },{
// timestamps:true
// });

// export default mongoose.models.Order ||
// mongoose.model("Order",OrderSchema);


import mongoose, { Schema, Model } from "mongoose";

interface IOrder {
  userId?: string;
  items?: any[];
  total?: number;
  status?: string;

  customer?: any;
  paymentMethod?: string;
  paymentProof?: string | null;

  tracking?: {
    status: string;
    date: Date;
  }[];

  /* ✅ NEW RETURN SYSTEM */
  returnRequest?: {
    requested: boolean;
    reason?: string;
    images?: string[];
    status?: string;
    requestedAt?: Date;
    approvedAt?: Date;
  };
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: String,
    items: Array,
    total: Number,
    status: String,

    customer: Schema.Types.Mixed,
    paymentMethod: String,
    paymentProof: String,

    tracking: [
      {
        status: String,
        date: Date
      }
    ],

    /* ✅ NEW (SAFE ADD) */
    returnRequest: {
      requested: { type: Boolean, default: false },
      reason: String,
      images: [String],
      status: {
        type: String,
        enum: ["none","requested","approved","rejected","completed"],
        default: "none"
      },
      requestedAt: Date,
      approvedAt: Date
    }

  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);

export default Order;