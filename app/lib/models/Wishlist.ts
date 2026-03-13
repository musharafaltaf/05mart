import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({

  userId: {
    type: String,
    default: "guest"
  },

  items: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String
    }
  ]

});

const Wishlist =
  mongoose.models.Wishlist ||
  mongoose.model("Wishlist", WishlistSchema);

export default Wishlist;