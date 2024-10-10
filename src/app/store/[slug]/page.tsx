"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { IProduct } from "@models/product.model";
import ReactImageMagnify from "react-image-magnify";
import { CallButton } from "@components/Button/Contact/Call";
import { EmailButton } from "@components/Button/Contact/Email";
import { WhatsAppButton } from "@components/Button/Contact/WhatsApp";
import { BadgeCheck } from "@components/svg/BadgeCheck";
import { TruckFast } from "@components/svg/TruckFast";

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
    <div className="border-b border-[#0000000D]">
      <button
        className="flex justify-between items-center w-full py-4 px-6 text-left"
        onClick={() => toggleSection(title)}
      >
        <span className="text-[24px] text-[#1F1F1F] font-[600]">{title}</span>
        <Image
          src={
            expandedSections.includes(title)
              ? "/svg/icons/minus.svg"
              : "/svg/icons/plus.svg"
          }
          alt={expandedSections.includes(title) ? "Collapse" : "Expand"}
          width={30}
          height={30}
          className={
            expandedSections.includes(title) ? "text-brand" : "text-gray-400"
          }
        />
      </button>
      {expandedSections.includes(title) && (
        <div className="px-6 pb-4 text-[#9B9B9B]">{content}</div>
      )}
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto max-xl:px-4 py-8">
      <div className="flex flex-col lg:flex-row mb-8">
        {/* Image Gallery */}
        <div className="flex flex-col lg:w-1/2 lg:mb-0">
          <div className="relative w-full ">
            <div className="p-[20px] bg-[#0000000D] rounded-[20px] inset-0">
                <ReactImageMagnify
                  {...{
                    enlargedImageClassName: 'rounded-[20px]',
                    imageClassName: 'rounded-[20px]',
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
                    enlargedImageContainerStyle: { background: "#fff", borderRadius: '20px' },
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
              <div className={`p-3.5 border border-[#0000000D] rounded-[20px] mr-2 ${activeImage === img ? 'bg-[#FF550026] border border-[#FF5500]' : 'bg-white'}`} key={index} >
                <Image
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  width={100}
                  height={100}
                  className={`min-w-[43px] w-[43px] h-[43px] min-h-[43px] object-cover cursor-pointer flex-shrink-0 rounded-[12px] ${activeImage === img ? '' : ''}`}
                  onClick={() => setActiveImage(img)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 lg:pl-8">
          <p className="text-[14px] font-[500] max-lg:mt-10 mb-4 text-brand">{product.brand}</p>
          <h1 className="text-[32px] font-[600] leading-[38px] mb-4">{product.title}</h1>
          <p className="text-[16px] text-[#9B9B9B] font-[500] mb-4">{product.tagline}</p>

          {/* Info Cards */}
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-center bg-white border border-[#0000000D] p-2 rounded-[20px] max-lg:px-10">
              <BadgeCheck className="text-brand mr-1.5 text-xl min-w-[31px]" />
              <span className="text-[#464646] font-[600] text-[16px]">
                All products are tested and checked before shipment.
              </span>
            </div>
            <div className="flex items-center justify-center bg-white border border-[#0000000D] p-2 rounded-[20px] max-lg:px-10">
              <TruckFast className="text-brand mr-1.5 text-xl min-w-[31px]" />
              <div>
                <span className="text-[#464646] font-[600]">
                  Worldwide shipping available.
                </span>
                <button className="inline-block text-[16px] text-brand font-[600] hover:underline mt-1 ml-[4px]">
                  Contact us for a quote &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-[#0000000D]" />

          {/* Price and Contact Buttons */}
          <div className="flex items-center justify-between max-lg:flex-col gap-y-2">
            <p className="text-[32px] text-[#464646] font-[500]">{`${product.price.toFixed(2)}€`}</p>
            {product.sold ? (
              <div className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-bold">
                SOLD
              </div>
            ) : (
              <div className="flex space-x-4">
                <CallButton className="bg-gray-200 text-gray-700 px-4 py-2 rounded" />
                <EmailButton className="bg-gray-200 text-gray-700 px-4 py-2 rounded" />
                <WhatsAppButton
                  phoneNumber="31687887743"
                  className="bg-[#3DED5E] text-[#464646] px-4 py-2 rounded"
                />
              </div>
            )}
          </div>
          {product.negotiable && !product.sold && (
            <p className="text-green-600 mt-2 max-lg:text-center">Price is negotiable</p>
          )}
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="mt-8 bg-white rounded-[20px]">
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
