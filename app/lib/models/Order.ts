import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
{
  userId: {
    type: String,
    default: "guest"
  },

  items: [
    {
      productId: String,
      name: String,
      price: Number,
      oldPrice: Number,
      image: String,
      quantity: Number
    }
  ],

  total: {
    type: Number,
    required: true
  },

  customer: {
    name: String,
    phone: String,
    address: String,
    city: String,
    zip: String
  },

  paymentMethod: String,

  status: {
    type: String,
    default: "placed"
  }

},
{ timestamps: true }
);

const Order =
  mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);

export default Order;