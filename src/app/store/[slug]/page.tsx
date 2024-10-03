"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { IProduct } from "@models/product.model";
import ReactImageMagnify from "react-image-magnify";
import { CallButton } from "@components/Button/Contact/Call";
import { EmailButton } from "@components/Button/Contact/Email";
import { WhatsAppButton } from "@components/Button/Contact/WhatsApp";
import { FaCheckCircle, FaTruck } from "react-icons/fa";

export default function StoreSlugPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "description",
  ]);

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

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
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
        <Image
          src={
            expandedSections.includes(title)
              ? "/svg/icons/minus.svg"
              : "/svg/icons/plus.svg"
          }
          alt={expandedSections.includes(title) ? "Collapse" : "Expand"}
          width={20}
          height={20}
          className={
            expandedSections.includes(title) ? "text-brand" : "text-gray-400"
          }
        />
      </button>
      {expandedSections.includes(title) && (
        <div className="px-6 pb-4 text-gray-600">{content}</div>
      )}
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row mb-8">
        {/* Image Gallery */}
        <div className="lg:w-1/2 lg:mb-0">
          <div className="relative w-full pt-[450px]">
            <div className="absolute inset-0">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: product.title,
                    isFluidWidth: true,
                    src: activeImage,
                  },
                  largeImage: {
                    src: activeImage,
                    width: 2000,
                    height: 2000,
                  },
                  enlargedImageContainerDimensions: {
                    width: "200%",
                    height: "100%",
                  },
                  enlargedImageContainerStyle: { background: "#fff" },
                  isHintEnabled: true,
                  shouldHideHintAfterFirstActivation: true,
                  enlargedImagePosition: "beside",
                  lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
                }}
              />
            </div>
          </div>
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
          <p className="text-xl mb-4 text-brand">{product.brand}</p>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-sm text-gray-600 mb-4">{product.tagline}</p>

          {/* Info Cards */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center bg-orange-50 p-4 rounded-lg">
              <FaCheckCircle className="text-brand mr-4 text-xl" />
              <span className="text-gray-700">
                All products are tested and checked before shipment.
              </span>
            </div>
            <div className="flex items-center bg-orange-50 p-4 rounded-lg">
              <FaTruck className="text-brand mr-4 text-xl" />
              <div>
                <span className="text-gray-700">
                  Worldwide shipping available.
                </span>
                <button className="block text-brand font-semibold hover:underline mt-1">
                  Contact us for a quote &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-gray-200" />

          {/* Price and Contact Buttons */}
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{`${product.price.toFixed(2)}€`}</p>
            {product.sold ? (
              <div className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-bold">
                SOLD
              </div>
            ) : (
              <div className="flex space-x-4">
                <WhatsAppButton
                  phoneNumber="31687887743"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                />
                <EmailButton className="bg-gray-200 text-gray-700 px-4 py-2 rounded" />
                <CallButton className="bg-gray-200 text-gray-700 px-4 py-2 rounded" />
              </div>
            )}
          </div>
          {product.negotiable && !product.sold && (
            <p className="text-green-600 mt-2">Price is negotiable</p>
          )}
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="mt-8 bg-white rounded-lg shadow-md">
        <AccordionSection
          title="Description"
          content={<p>{product.description}</p>}
        />
        <AccordionSection
          title="General Specifications"
          content={
            <ul className="space-y-2">
              {product.specifications.map((spec, index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-gray-700">{spec.spec}</span>
                  <span className="font-semibold">{spec.value}</span>
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
