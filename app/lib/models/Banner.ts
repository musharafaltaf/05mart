import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
title: String,
subtitle: String,
buttonText: String,
buttonLink: String,
image: String
},{timestamps:true});

export default mongoose.models.Banner ||
mongoose.model("Banner",BannerSchema);