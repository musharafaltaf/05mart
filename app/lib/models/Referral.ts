import mongoose from "mongoose";

const ReferralSchema = new mongoose.Schema({

  referrer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required:true
  },

  referredUser:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required:true
  },

  status:{
    registered:{ type:Boolean, default:true },
    ordered:{ type:Boolean, default:false },
    delivered:{ type:Boolean, default:false },
    rewardGiven:{ type:Boolean, default:false }
  }

},{
  timestamps:true
});

export default mongoose.models.Referral ||
mongoose.model("Referral", ReferralSchema);