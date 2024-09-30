"use client";

import React, { useState } from "react";
import Image from "next/image";

export const SellForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
    brand: "",
    modelName: "", // Updated field name
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
    <div className="max-w-[1200px] max-h-[1138px] mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <Image
          src="/svg/icons/sound-icons-array.svg"
          alt="Audio Equipment Icons"
          width={400}
          height={50}
          className="mx-auto"
        />
      </div>

      <h1 className="text-3xl font-bold text-center text-orange-500 mb-4">
        Submit Your Equipment
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Upload pictures, add details, and get a quick quote for your surplus
        audio gear.
      </p>

      <form
        id="sellForm"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg h-48 flex flex-col items-center justify-center">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition duration-300">
                📷 Upload Picture
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
            <div className="mt-4 flex flex-wrap gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <span
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                  >
                    &times;
                  </span>
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 font-semibold">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border rounded"
              placeholder="Meta"
            />
          </div>

          <div>
            <label htmlFor="brand" className="block mb-2 font-semibold">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter the Brand"
            />
          </div>

          <div>
            <label htmlFor="modelName" className="block mb-2 font-semibold">
              Model
            </label>
            <input
              type="text"
              id="modelName" // Updated field name
              name="modelName" // Updated field name
              value={formData.modelName} // Updated field name
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your Model"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Condition</label>
            <div className="flex space-x-2">
              {["Bad", "Okay", "Refurbished", "Good", "Excellent", "New"].map(
                (condition) => (
                  <button
                    key={condition}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, condition }))
                    }
                    className={`px-3 py-1 rounded ${
                      formData.condition === condition
                        ? "bg-orange-500 text-white"
                        : "border border-gray-300 text-gray-700"
                    }`}
                  >
                    {condition}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your E-Mail"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block mb-2 font-semibold">
              Phone Number
            </label>
            <div className="flex">
              <select className="p-2 border rounded-l w-20" defaultValue="NL">
                <option value="NL">NL</option>
                {/* Add more country options here */}
              </select>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-r"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg space-y-4">
            <h2 className="text-xl font-bold text-orange-600">
              Got Excess PA Gear? We&#39;re Interested!
            </h2>
            <p className="text-sm text-gray-600">
              Our specialized service caters to businesses with large quantities
              of leftover or outdated professional audio equipment. From
              speakers to amplifiers, we simplify the process of turning your
              unused gear into cash with fast quotes and quick pickups.
            </p>

            <h3 className="text-lg font-bold text-orange-600">
              We Make Selling Simple
            </h3>
            <p className="text-sm text-gray-600">
              Don&#39;t worry about logistics. We handle everything from pickup
              to payment. Bulk sellers get priority service and instant
              payments.
            </p>

            <a
              href="#"
              className="inline-flex items-center text-green-600 font-semibold hover:text-green-700"
            >
              <span className="mr-2">🟢</span> Get a Quick Quote Now &gt;
            </a>
          </div>
        </div>
      </form>

      <div className="mt-8 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Our team will review your submission and get back to you with a quote
          within 24 hours.
        </p>
        <button
          type="submit"
          form="sellForm"
          className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300"
        >
          ✉️ Submit
        </button>
      </div>
    </div>
  );
};

// path: src/components/Form/SellForm.tsx
