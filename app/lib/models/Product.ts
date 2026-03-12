import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
{
  name: String,

  price: Number,          // original price

  discount: {
    type: Number,
    default: 0
  },

  image: String,

  description: String,

  category: String,

  stock: Number
},
{ timestamps: true }
);

export default mongoose.models.Product ||
mongoose.model("Product", ProductSchema);