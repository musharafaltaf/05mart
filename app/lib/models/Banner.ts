import mongoose, { Schema, Model } from "mongoose";

interface IBanner {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: string;
}

const BannerSchema = new Schema<IBanner>(
  {
    title: String,
    subtitle: String,
    buttonText: String,
    buttonLink: String,
    image: String,
  },
  { timestamps: true }
);

const Banner: Model<IBanner> =
  mongoose.models.Banner ||
  mongoose.model<IBanner>("Banner", BannerSchema);

export default Banner;