import mongoose, { Document, Model } from "mongoose";

export interface IIncoming extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  description: string;
  brand: string;
  modelName: string;
  condition: "Bad" | "Okay" | "Refurbished" | "Good" | "Excellent" | "New";
  images: string[];
  status: "Pending" | "Reviewed" | "Quoted" | "Accepted" | "Rejected";
  createdAt: Date;
}

const incomingSchema = new mongoose.Schema<IIncoming>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  modelName: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    enum: ["Bad", "Okay", "Refurbished", "Good", "Excellent", "New"],
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Quoted", "Accepted", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Incoming: Model<IIncoming> =
  mongoose.models.Incoming ||
  mongoose.model<IIncoming>("Incoming", incomingSchema);

export default Incoming;

// path: src/models/incoming.model.ts
