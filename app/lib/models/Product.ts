import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  images: {
    type: [String],
    default: []
  },

  description: {
    type: String,
    default: ""
  },

  category: {
    type: String,
    default: ""
  },

  stock: {
    type: Number,
    default: 0
  },

  sizes: {
    type: [String],
    default: []
  }

},
{ timestamps: true }
);

const Product =
mongoose.models.Product ||
mongoose.model("Product", ProductSchema);

export default Product;