"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@hooks/useAuth";
import { ProductForm } from "@components/Admin/Form/ProductForm";
import { IProduct } from "@models/product.model";

export default function EditProductPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const { slug } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProduct();
    }
  }, [slug, isAuthenticated]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Redirect is handled by useAuth
  }

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Product: {product.title}</h1>
      <ProductForm initialData={product} />
    </div>
  );
}

// path: src/app/admin/products/[∂slug]/edit/page.tsx
