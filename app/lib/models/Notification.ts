import mongoose, { Schema, Model } from "mongoose";

interface INotification {
  userId?: string;
  message: string;
  read?: boolean;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: String,
    message: String,
    read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Notification: Model<INotification> =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", NotificationSchema);

export default Notification;