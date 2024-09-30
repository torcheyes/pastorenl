import React from "react";
import ProductCard from "@components/Card/ProductCard";
import { IProduct } from "@models/product.model";

interface ProductsProps {
  products: IProduct[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className="max-w-[1200px] container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;

// path: src/containers/Store/Products.tsx
