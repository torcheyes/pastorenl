"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IProduct } from "@models/product.model";
import { useAuth } from "@hooks/useAuth";

interface ProductFormProps {
  initialData?: IProduct;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const { authFetch } = useAuth();

  const [productData, setProductData] = useState<Partial<IProduct>>({
    slug: "",
    title: "",
    brand: "",
    tagline: "",
    description: "",
    price: 0,
    imagePath: "",
    specifications: [],
    dimensions: { length: 0, width: 0, height: 0 },
    features: [],
    whatsInTheBox: [],
    negotiable: false,
    category: "",
    sold: false,
    featured: false,
  });
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (initialData) {
      setProductData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProductData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDimensionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions!, [name]: Number(value) },
    }));
  };

  const handleArrayInputChange = (
    index: number,
    field: "features" | "whatsInTheBox",
    value: string,
  ) => {
    const newArray = [...productData[field]!];
    newArray[index] = value;
    setProductData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: "features" | "whatsInTheBox") => {
    setProductData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ""],
    }));
  };

  const removeArrayItem = (
    index: number,
    field: "features" | "whatsInTheBox",
  ) => {
    setProductData((prev) => ({
      ...prev,
      [field]: prev[field]!.filter((_, i) => i !== index),
    }));
  };

  const handleSpecificationChange = (
    index: number,
    field: "spec" | "value",
    value: string,
  ) => {
    const newSpecs = [...productData.specifications!];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setProductData((prev) => ({ ...prev, specifications: newSpecs }));
  };

  const addSpecification = () => {
    setProductData((prev) => ({
      ...prev,
      specifications: [...(prev.specifications || []), { spec: "", value: "" }],
    }));
  };

  const removeSpecification = (index: number) => {
    setProductData((prev) => ({
      ...prev,
      specifications: prev.specifications!.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    // Append product data
    Object.entries(productData).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    // Append images
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    try {
      const url = initialData
        ? `/api/products/${initialData.slug}`
        : "/api/products";
      const method = initialData ? "PUT" : "POST";

      const response = await authFetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      await response.json();
      alert(
        initialData
          ? "Product updated successfully!"
          : "Product created successfully!",
      );
      router.push("/admin/products"); // Redirect to product list
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Basic Information */}
      <div>
        <label htmlFor="slug" className="block mb-1">
          Slug:
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={productData.slug}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="title" className="block mb-1">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={productData.title}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="brand" className="block mb-1">
          Brand:
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={productData.brand}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      {/* Tagline field */}
      <div>
        <label htmlFor="tagline" className="block mb-1">
          Tagline:
        </label>
        <input
          type="text"
          id="tagline"
          name="tagline"
          value={productData.tagline}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="price" className="block mb-1">
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="category" className="block mb-1">
          Category:
        </label>
        <select
          id="category"
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select a category</option>
          <option value="Speakers">Speakers</option>
          <option value="Amplifiers">Amplifiers</option>
          <option value="Mixing Panels">Mixing Panels</option>
          <option value="Processors">Processors</option>
          <option value="Equalizers">Equalizers</option>
          <option value="Effects">Effects</option>
          <option value="Lighting">Lighting</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="negotiable"
            checked={productData.negotiable}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Negotiable
        </label>
      </div>
      {/* Sold checkbox */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="sold"
            checked={productData.sold}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Sold
        </label>
      </div>
      {/* Featured checkbox */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            checked={productData.featured}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Featured Product
        </label>
      </div>

      {/* Dimensions */}
      <div>
        <h3 className="font-bold mb-2">Dimensions:</h3>
        <div className="flex space-x-2">
          <input
            type="number"
            name="length"
            placeholder="Length"
            value={productData.dimensions?.length}
            onChange={handleDimensionsChange}
            className="w-1/3 p-2 border rounded"
          />
          <input
            type="number"
            name="width"
            placeholder="Width"
            value={productData.dimensions?.width}
            onChange={handleDimensionsChange}
            className="w-1/3 p-2 border rounded"
          />
          <input
            type="number"
            name="height"
            placeholder="Height"
            value={productData.dimensions?.height}
            onChange={handleDimensionsChange}
            className="w-1/3 p-2 border rounded"
          />
        </div>
      </div>

      {/* Specifications */}
      <div>
        <h3 className="font-bold mb-2">Specifications:</h3>
        {productData.specifications?.map((spec, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Specification"
              value={spec.spec}
              onChange={(e) =>
                handleSpecificationChange(index, "spec", e.target.value)
              }
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Value"
              value={spec.value}
              onChange={(e) =>
                handleSpecificationChange(index, "value", e.target.value)
              }
              className="w-1/2 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeSpecification(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSpecification}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Specification
        </button>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-bold mb-2">Features:</h3>
        {productData.features?.map((feature, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              value={feature}
              onChange={(e) =>
                handleArrayInputChange(index, "features", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeArrayItem(index, "features")}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("features")}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Feature
        </button>
      </div>

      {/* What's in the Box */}
      <div>
        <h3 className="font-bold mb-2">What&apos;s in the Box:</h3>
        {productData.whatsInTheBox?.map((item, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                handleArrayInputChange(index, "whatsInTheBox", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeArrayItem(index, "whatsInTheBox")}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("whatsInTheBox")}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Item
        </button>
      </div>

      {/* Images */}
      <div>
        <label htmlFor="images" className="block mb-1">
          Images:
        </label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
        <div className="mt-2 flex flex-wrap">
          {images.map((image, index) => (
            <div key={index} className="relative m-2">
              <Image
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className="w-24 h-24 object-cover"
                width={96}
                height={96}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {initialData ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}

// path: src/components/Admin/Form/ProductForm.tsx
