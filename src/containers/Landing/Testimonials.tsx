"use client";

import React, { useState, useEffect } from "react";
import TestimonialCard from "@components/Card/TestimonalCard";
import { Testimonial } from "@types";

const testimonials: Testimonial[] = [
  {
    brand: "aveq",
    quote:
      "AVEQ has been working with them for years. The service is fast, reliable, and always top quality.",
    author: "Name Placeholder",
  },
  {
    brand: "dep",
    quote:
      "AVEQ has been working with them for years. The service is fast, reliable, and always top quality.",
    author: "Name Placeholder",
  },
  {
    brand: "hpa",
    quote:
      "AVEQ has been working with them for years. The service is fast, reliable, and always top quality.",
    author: "Name Placeholder",
  },
  {
    brand: "luxonos",
    quote:
      "AVEQ has been working with them for years. The service is fast, reliable, and always top quality.",
    author: "Name Placeholder",
  },
  {
    brand: "roodhof",
    quote:
      "AVEQ has been working with them for years. The service is fast, reliable, and always top quality.",
    author: "Name Placeholder",
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    const indices = [
      (currentIndex - 1 + testimonials.length) % testimonials.length,
      currentIndex,
      (currentIndex + 1) % testimonials.length,
    ];
    return indices.map((index) => testimonials[index]);
  };

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="w-[1200px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="relative overflow-hidden" style={{ height: "250px" }}>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 400}px)`,
              width: `${testimonials.length * 400}px`,
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.brand}-${index}`}
                className="w-[400px] px-2.5"
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === currentIndex ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

// path: src/containers/Landing/Testimonials.tsx
