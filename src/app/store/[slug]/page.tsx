"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { IProduct } from "@models/product.model";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function StoreSlugPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "description",
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        setActiveImage(data.imagePath.split(",")[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const discountedPrice = product.price * (1 - product.discount / 100);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const AccordionSection = ({
    title,
    content,
  }: {
    title: string;
    content: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 px-6 text-left"
        onClick={() => toggleSection(title)}
      >
        <span className="text-lg font-semibold">{title}</span>
        {expandedSection === title ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {expandedSection === title && <div className="px-6 pb-4">{content}</div>}
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row mb-8">
        {/* Image Gallery */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <Image
            src={activeImage}
            alt={product.title}
            width={600}
            height={600}
            className="w-full h-auto"
          />
          <div className="flex mt-4 overflow-x-auto">
            {product.imagePath.split(",").map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`${product.title} ${index + 1}`}
                width={100}
                height={100}
                className="w-20 h-20 object-cover mr-2 cursor-pointer flex-shrink-0"
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 lg:pl-8">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl mb-4">{product.brand}</p>
          <p className="text-2xl font-bold mb-4">
            {product.discount > 0 ? (
              <div>
                <span className="line-through text-gray-500 mr-2">
                  {product.price.toFixed(2)}€
                </span>
                <span className="text-red-600">
                  {discountedPrice.toFixed(2)}€
                </span>
              </div>
            ) : (
              `${product.price.toFixed(2)}€`
            )}
          </p>
          {product.negotiable && (
            <p className="text-green-600 mb-4">Price is negotiable</p>
          )}
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="border-t border-gray-200">
        <AccordionSection
          title="Description"
          content={<p>{product.description}</p>}
        />
        <AccordionSection
          title="General Specifications"
          content={
            <ul>
              {product.specifications.map((spec, index) => (
                <li key={index} className="mb-1">
                  <span className="font-semibold">{spec.spec}:</span>{" "}
                  {spec.value}
                </li>
              ))}
            </ul>
          }
        />
        <AccordionSection
          title="Dimensions"
          content={
            <p>
              {product.dimensions.length} x {product.dimensions.width} x{" "}
              {product.dimensions.height} cm
            </p>
          }
        />
        <AccordionSection
          title="Features"
          content={
            <ul className="list-disc list-inside">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          }
        />
        <AccordionSection
          title="What's In the Box?"
          content={
            <ul className="list-disc list-inside">
              {product.whatsInTheBox.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          }
        />
      </div>
    </div>
  );
}

// path: src/app/store/[slug]/page.tsx
