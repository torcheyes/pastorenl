import mongoose, { Document, Model } from "mongoose";

export interface IProduct extends Document {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category: string;
  imagePath: string;
}

const productSchema = new mongoose.Schema<IProduct>({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: false,
  },
});

productSchema.index({ title: "text", description: "text" });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;

// path: src/models/product.model.ts
