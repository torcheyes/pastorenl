"use client";

import React, { useState, useEffect } from "react";
import { IProduct } from "@models/product.model";
import ProductCard from "@components/Card/ProductCard";
import { ExploreProductsButton } from "@components/Button/ExploreProductsButton";
//import { CycleButton } from "@components/Button/CycleButton";

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect( () => {

  }, [setCurrentIndex])

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {

    try {
      const response = await fetch("/api/products?featured=true");
      const data = await response.json();
      if(data.error) return
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching featured products:", error)
    }
  };

  /*const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length,
    );
  };*/

  const getVisibleProducts = () => {
    if (products.length === 0) return [];
    const visibleProducts = [];
    for (let i = 0; i < 3; i++) {
      visibleProducts.push(products[(currentIndex + i) % products.length]);
    }
    console.log('visibleProducts:', visibleProducts)
    return visibleProducts;
  };

  return (
    <div className="max-w-full py-16 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex max-lg:flex-wrap justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <div className="flex items-center space-x-4 max-lg:mt-4">
            {
              //<CycleButton direction="left" onClick={handlePrev} />
              //<CycleButton direction="right" onClick={handleNext} />
            }
            <ExploreProductsButton className="!text-[20px] whitespace-nowrap" />
          </div>
        </div>
        <div className="relative">
          <div className="flex overflow-x-auto overflow-y-hidden">
            {getVisibleProducts().map((product) => (
              <div key={product?.slug} className="w-1/3 px-2 min-w-[257.33px]">
                {product && <ProductCard product={product} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;

// path: src/containers/Landing/FeaturedProducts.tsx
