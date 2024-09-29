import mongoose, { Document, Model } from "mongoose";

export interface IIncoming extends Document {
  id: string;
  product: string;
  quantity: number;
  images: string[];
  status: string;
  date: Date;
}

const incomingSchema = new mongoose.Schema<IIncoming>({
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Incoming: Model<IIncoming> =
  mongoose.models.Incoming ||
  mongoose.model<IIncoming>("Incoming", incomingSchema);

export default Incoming;

// path: src/models/incoming.model.ts
