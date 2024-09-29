"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StoreHeader from "@containers/Store/StoreHeader";
import ProductsContainer from "@containers/Store/Products";
import BottomNavigation from "@containers/Store/BottomNav";
import { IProduct } from "@models/product.model";

export default function StoreClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState("latest");
  const [currentCategory, setCurrentCategory] = useState("All");

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const sort = searchParams.get("sort") || "latest";
    const category = searchParams.get("category") || "All";

    setCurrentPage(page);
    setItemsPerPage(limit);
    setSortBy(sort);
    setCurrentCategory(category);

    fetchProducts(page, limit, sort, category);
  }, [searchParams]);

  const fetchProducts = async (
    page: number,
    limit: number,
    sort: string,
    category: string,
  ) => {
    try {
      const response = await fetch(
        `/api/products?page=${page}&limit=${limit}&sort=${sort}&category=${category}`,
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePageChange = (page: number) => {
    router.push(
      `/store?page=${page}&limit=${itemsPerPage}&sort=${sortBy}&category=${currentCategory}`,
    );
  };

  const handleItemsPerPageChange = (limit: number) => {
    router.push(
      `/store?page=1&limit=${limit}&sort=${sortBy}&category=${currentCategory}`,
    );
  };

  const handleSortChange = (sort: string) => {
    router.push(
      `/store?page=1&limit=${itemsPerPage}&sort=${sort}&category=${currentCategory}`,
    );
  };

  const handleCategoryChange = (category: string) => {
    router.push(
      `/store?page=1&limit=${itemsPerPage}&sort=${sortBy}&category=${category}`,
    );
  };

  return (
    <div>
      <StoreHeader
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        currentCategory={currentCategory}
        currentSort={sortBy}
      />
      <ProductsContainer products={products} />
      <BottomNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}

// path: src/app/store/StoreClient.tsx
