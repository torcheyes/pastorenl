import mongoose, { Document, Model } from "mongoose";

interface ISpecification {
  spec: string;
  value: string;
}

interface IDimensions {
  length: number;
  width: number;
  height: number;
}

export interface IProduct extends Document {
  slug: string;
  title: string;
  brand: string;
  tagline: string;
  description?: string;
  price: number;
  imagePath: string;
  specifications: ISpecification[];
  dimensions: IDimensions;
  features: string[];
  whatsInTheBox: string[];
  negotiable: boolean;
  category: string;
  sold: boolean;
  featured: boolean;
}

const specificationSchema = new mongoose.Schema<ISpecification>({
  spec: { type: String, required: true },
  value: { type: String, required: true },
});

const dimensionsSchema = new mongoose.Schema<IDimensions>({
  length: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
});

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
  brand: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  specifications: [specificationSchema],
  dimensions: {
    type: dimensionsSchema,
    required: true,
  },
  features: [
    {
      type: String,
      required: true,
    },
  ],
  whatsInTheBox: [
    {
      type: String,
      required: true,
    },
  ],
  negotiable: {
    type: Boolean,
    required: true,
    default: false,
  },
  category: {
    type: String,
    required: true,
  },
  sold: {
    type: Boolean,
    required: true,
    default: false,
  },
  featured: {
    type: Boolean,
    required: true,
    default: false,
  },
});

productSchema.index({
  title: "text",
  description: "text",
  brand: "text",
  tagline: "text",
});

// Check if the model already exists before compiling it
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;

// path: src/models/product.model.ts
