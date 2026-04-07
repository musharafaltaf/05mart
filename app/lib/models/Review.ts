import mongoose, { Schema, Model } from "mongoose";

export interface IReview {
  productId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  userName?: string;

  rating: number;
  comment?: string;

  images?: string[];

  helpful?: number;

  verified?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

const ReviewSchema = new Schema<IReview>(
{
  productId:{
    type:Schema.Types.ObjectId,
    ref:"Product",
    required:true
  },

  userId:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },

  userName:{
    type:String
  },

  rating:{
    type:Number,
    required:true,
    min:1,
    max:5
  },

  comment:{
    type:String,
    trim:true
  },

  images:{
    type:[String],
    default:[]
  },

  helpful:{
    type:Number,
    default:0
  },

  verified:{
    type:Boolean,
    default:true
  }

},
{
  timestamps:true
});

/* ========================= */
/* PREVENT DUPLICATE REVIEWS */
/* ========================= */

ReviewSchema.index(
{ productId:1, userId:1 },
{ unique:false }
);

/* ========================= */

const Review: Model<IReview> =
mongoose.models.Review ||
mongoose.model<IReview>("Review", ReviewSchema);

export default Review;




// import mongoose, { Schema, Model } from "mongoose";

// interface IReview {
//   productId: string;
//   userId: string;
//   userName: string;

//   rating: number;
//   comment?: string;

//   images?: string[];

//   helpful?: number;
// }

// const ReviewSchema = new Schema<IReview>(
// {
//   productId: {
//     type: String,
//     required: true
//   },

//   userId: {
//     type: String,
//     required: true
//   },

//   userName: {
//     type: String,
//     required: true
//   },

//   rating: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 5
//   },

//   comment: String,

//   images: [String],

//   helpful: {
//     type: Number,
//     default: 0
//   }

// },
// { timestamps:true }
// );

// /* PREVENT DUPLICATE REVIEWS */

// ReviewSchema.index(
// { productId:1, userId:1 },
// { unique:true }
// );

// const Review: Model<IReview> =
// mongoose.models.Review ||
// mongoose.model<IReview>("Review", ReviewSchema);

// export default Review;