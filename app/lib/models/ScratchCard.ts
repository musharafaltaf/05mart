import mongoose from "mongoose";

const ScratchSchema = new mongoose.Schema({

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Users"
  },

  amount:{
    type:Number
  },

  isScratched:{
    type:Boolean,
    default:false
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

export default mongoose.models.ScratchCard ||
mongoose.model("ScratchCard", ScratchSchema);