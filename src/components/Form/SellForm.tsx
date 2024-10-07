"use client";

import React, { useState } from "react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { GetAQuickQuoteNow } from "@components/Button/GetAQuickQuoteNow";

export const SellForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
    brand: "",
    modelName: "",
    condition: "Excellent",
  });
  const [images, setImages] = useState<File[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append form fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Append images to FormData
    images.forEach((image) => {
      formDataToSend.append(`images`, image);
    });

    try {
      const response = await fetch("/api/incoming", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      const result = await response.json();
      console.log("Request submitted successfully:", result);
      alert(
        "Your equipment submission was successful! We will get back to you within 24 hours.",
      );

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        description: "",
        brand: "",
        modelName: "", // Updated field name
        condition: "Excellent",
      });
      setImages([]);
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit your equipment. Please try again.");
    }
  };

  return (
    <div className="max-w-[1200px] mt-8 mb-32 mx-auto p-8 bg-white rounded-lg border border-[#0000000D]" style={{background: 'radial-gradient(25% 25% at 50.04% 0%, rgba(255, 85, 0, 0.2) 0%, rgba(255, 255, 255, 0) 100%)'}}>
      <div className="mb-6 mt-8">
        <Image
          src="/svg/icons/sound-icons-array.svg"
          alt="Audio Equipment Icons"
          width={400}
          height={50}
          className="mx-auto"
        />
      </div>

      <h1 className="text-3xl font-bold text-center text-brand mb-4">
        Submit Your Equipment
      </h1>
      <p className="text-center text-[20px] text-[#464646] mb-8">
        Upload pictures, add details, and get a quick quote for your surplus
        audio gear.
      </p>

      <form
        id="sellForm"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="space-y-8">
          {/* Image Upload Box */}
          <div className="bg-white p-2.5 rounded-lg border border-[#0000000D]">
            <div className="bg-gray-100 p-4 rounded-lg h-[227px] flex flex-col items-center justify-center">
              <label htmlFor="imageUpload" className="cursor-pointer mb-4">
                <span className="bg-brand font-semibold text-white px-5 py-4 rounded-[12px] hover:bg-orange-600 transition duration-300">
                  <Image
                    src="/svg/icons/duplicate.svg"
                    alt="Upload"
                    width={24}
                    height={24}
                    className="inline mr-2"
                  />
                  Upload Picture
                </span>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    <span>{image.name.slice(0, 8)}...</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description to Condition Box */}
          <div className="bg-white p-6 rounded-lg border border-[#0000000D] space-y-6 max-w-[554px] max-h-[750px]">
            <div>
              <label htmlFor="description" className="block mb-2 ml-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-2 border border-[#0000000D] rounded-[10px] resize-none"
                placeholder="Meta"
              />
            </div>

            <div>
              <label htmlFor="brand" className="block mb-2 ml-2">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full p-2 border border-[#0000000D] rounded"
                placeholder="Enter the Brand"
              />
            </div>

            <div>
              <label htmlFor="modelName" className="block mb-2 ml-2">
                Model
              </label>
              <input
                type="text"
                id="modelName"
                name="modelName"
                value={formData.modelName}
                onChange={handleInputChange}
                className="w-full p-2 border border-[#0000000D] rounded"
                placeholder="Enter your Model"
              />
            </div>

            <div>
              <label className="block mb-2 ml-2">Condition</label>
              <div className="flex flex-wrap gap-2">
                {["Bad", "Okay", "Refurbished", "Good", "Excellent", "New"].map(
                  (condition) => (
                    <button
                      key={condition}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, condition }))
                      }
                      className={`px-3 py-3 rounded-[10px] ${
                        formData.condition === condition
                          ? "border border-brand text-brand"
                          : "border border-[#0000000D] text-[#9B9B9B]"
                      }`}
                    >
                      {condition}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Box */}
        <div className="bg-white p-6 rounded-lg border border-[#0000000D] space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 ml-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-[#0000000D] rounded"
              placeholder="Enter your Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 ml-2">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-[#0000000D] rounded"
              placeholder="Enter your E-Mail"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block mb-2 ml-2">
              Phone Number
            </label>
            <PhoneInput
              country={"nl"}
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              inputProps={{
                name: "phoneNumber",
                required: true,
              }}
              containerClass="w-full"
              inputClass="w-full p-2 pr-10 !pl-[60px] border !border-[#0000000D] rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              buttonClass="custom-phone-button"
              dropdownClass="custom-phone-dropdown"
              inputStyle={{height: '57px !important'}}
            />
          </div>

          {/* Got Excess PA Gear Box */}
          <div className="bg-[#FF55000D] p-6 rounded-lg">
            <h2 className="text-xl font-bold text-brand mb-4">
              Got Excess PA Gear? We&apos;re Interested!
            </h2>
            <p className="text-[#9B9B9B] mb-2 text-[14px]">
              Our specialized service caters to businesses with large quantities
              of leftover or outdated professional audio equipment. From
              speakers to amplifiers, we simplify the process of turning your
              unused gear into cash with fast quotes and quick pickups.
            </p>
          </div>

          {/* We Make Selling Simple Box */}
          <div className="bg-[#FF55000D] p-6 rounded-lg">
            <h3 className="text-lg font-bold text-brand mb-4">
              We Make Selling Simple
            </h3>
            <p className="text-[#9B9B9B] mb-2 text-[14px]">
              Don&apos;t worry about logistics. We handle everything from pickup
              to payment. Bulk sellers get priority service and instant
              payments.
            </p>
            <GetAQuickQuoteNow />
          </div>
        </div>
      </form>

      {/* Bottom Box */}
      <div className="mt-4 max-w-[1140px] bg-white p-4 rounded-lg border border-[#0000000D]">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[16px] text-[#464646] md:w-2/3">
            Our team will review your submission and get back to you with a
            quote within 24 hours.
          </p>
          <button
            type="submit"
            form="sellForm"
            className="bg-brand text-white justify-center w-[300px] py-3 rounded-xl text-lg font-semibold hover:bg-orange-600 transition duration-300 flex items-center"
          >
            <Image
              src="/svg/icons/plane.svg"
              alt="Submit"
              width={24}
              height={24}
              className="mr-2"
            />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

// path: src/components/Form/SellForm.tsx
