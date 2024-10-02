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
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 24;
    const sort = searchParams.get("sort") || "latest";
    const category = searchParams.get("category") || undefined;

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
    category?: string,
  ) => {
    try {
      let url = `/api/products?page=${page}&limit=${limit}&sort=${sort}`;
      if (category) {
        url += `&category=${category}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePageChange = (page: number) => {
    const url = new URL("/store", window.location.origin);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", itemsPerPage.toString());
    url.searchParams.set("sort", sortBy);
    if (currentCategory) url.searchParams.set("category", currentCategory);
    router.push(url.pathname + url.search);
  };

  const handleItemsPerPageChange = (limit: number) => {
    const url = new URL("/store", window.location.origin);
    url.searchParams.set("page", "1");
    url.searchParams.set("limit", limit.toString());
    url.searchParams.set("sort", sortBy);
    if (currentCategory) url.searchParams.set("category", currentCategory);
    router.push(url.pathname + url.search);
  };

  const handleSortChange = (sort: string) => {
    const url = new URL("/store", window.location.origin);
    url.searchParams.set("page", "1");
    url.searchParams.set("limit", itemsPerPage.toString());
    url.searchParams.set("sort", sort);
    if (currentCategory) url.searchParams.set("category", currentCategory);
    router.push(url.pathname + url.search);
  };

  const handleCategoryChange = (category: string | undefined) => {
    const url = new URL("/store", window.location.origin);
    url.searchParams.set("page", "1");
    url.searchParams.set("limit", itemsPerPage.toString());
    url.searchParams.set("sort", sortBy);
    if (category) url.searchParams.set("category", category);
    router.push(url.pathname + url.search);
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
