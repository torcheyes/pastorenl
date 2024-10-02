import dbConnect from "@utils/mongo.util";
import Product, { IProduct } from "@models/product.model";

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export const getProducts = async (): Promise<IProduct[]> => {
  await dbConnect();
  try {
    return await Product.find().lean();
  } catch (error) {
    console.error("Failed to get products:", error);
    throw new Error("Failed to get products");
  }
};

export const getFeaturedProducts = async (): Promise<IProduct[]> => {
  await dbConnect();
  try {
    return await Product.find({ featured: true }).lean();
  } catch (error) {
    console.error("Failed to get featured products:", error);
    throw new Error("Failed to get featured products");
  }
};

export const getProductBySlug = async (
  slug: string,
): Promise<IProduct | null> => {
  await dbConnect();
  try {
    return await Product.findOne({ slug }).lean();
  } catch (error) {
    console.error(`Failed to get product with slug ${slug}:`, error);
    throw new Error("Failed to get product");
  }
};

export const createProduct = async (
  productData: Partial<IProduct>,
): Promise<IProduct> => {
  await dbConnect();
  try {
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    return savedProduct;
  } catch (error) {
    console.error("Failed to create product. Error details:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create product: ${error.message}`);
    } else {
      throw new Error("Failed to create product: Unknown error");
    }
  }
};

export const updateProduct = async (
  slug: string,
  updateData: Partial<IProduct>,
): Promise<IProduct | null> => {
  await dbConnect();
  try {
    console.log(`Attempting to update product with slug: ${slug}`);
    console.log("Update data:", JSON.stringify(updateData, null, 2));

    // If the title is being updated, we might need to update the slug as well
    if (updateData.title) {
      const newSlug = slugify(updateData.title);
      // Only update the slug if it's different from the current one
      if (newSlug !== slug) {
        // Check if the new slug already exists (excluding the current product)
        const currentProduct = await Product.findOne({ slug });
        if (!currentProduct) {
          throw new Error("Current product not found");
        }
        const existingProduct = await Product.findOne({
          slug: newSlug,
          _id: { $ne: currentProduct._id },
        });
        if (existingProduct) {
          throw new Error("A product with this title already exists");
        }
        updateData.slug = newSlug;
      }
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      throw new Error("Product not found");
    }

    console.log("Product updated successfully:", updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error(`Failed to update product with slug ${slug}:`, error);
    throw error;
  }
};

export const deleteProduct = async (slug: string): Promise<IProduct | null> => {
  await dbConnect();
  try {
    return await Product.findOneAndDelete({ slug });
  } catch (error) {
    console.error(`Failed to delete product with slug ${slug}:`, error);
    throw new Error("Failed to delete product");
  }
};

export const getProductsByCategory = async (
  category: string,
): Promise<IProduct[]> => {
  await dbConnect();
  try {
    if (category.toLowerCase() === "all") {
      return await Product.find().lean();
    }
    return await Product.find({ category }).lean();
  } catch (error) {
    console.error(`Failed to get products in category ${category}:`, error);
    throw new Error("Failed to get products by category");
  }
};

export const searchProducts = async (query: string): Promise<IProduct[]> => {
  await dbConnect();
  try {
    return await Product.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } },
    )
      .sort({ score: { $meta: "textScore" } })
      .lean();
  } catch (error) {
    console.error(`Failed to search products with query ${query}:`, error);
    throw new Error("Failed to search products");
  }
};

export const getProductsWithPagination = async (
  page: number = 1,
  limit: number = 12,
  sort: string = "latest",
  category?: string,
): Promise<{
  products: IProduct[];
  totalPages: number;
  currentPage: number;
}> => {
  await dbConnect();
  try {
    let query = {};
    if (category) {
      query = { category };
    }

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    let sortOption = {};
    switch (sort) {
      case "price_asc":
        sortOption = { price: 1 };
        break;
      case "price_desc":
        sortOption = { price: -1 };
        break;
      case "latest":
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return {
      products,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error(`Failed to get products with pagination:`, error);
    throw new Error("Failed to get products with pagination");
  }
};

export const getProductsByBrand = async (
  brand: string,
): Promise<IProduct[]> => {
  await dbConnect();
  try {
    return await Product.find({ brand }).lean();
  } catch (error) {
    console.error(`Failed to get products by brand ${brand}:`, error);
    throw new Error("Failed to get products by brand");
  }
};

export const getProductsByPriceRange = async (
  minPrice: number,
  maxPrice: number,
): Promise<IProduct[]> => {
  await dbConnect();
  try {
    return await Product.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).lean();
  } catch (error) {
    console.error(
      `Failed to get products in price range ${minPrice}-${maxPrice}:`,
      error,
    );
    throw new Error("Failed to get products by price range");
  }
};

// path: src/controllers/product.controller.ts
