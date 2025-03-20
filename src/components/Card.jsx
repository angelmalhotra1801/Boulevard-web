"use client";
import React, { forwardRef } from "react";

const Card = forwardRef(({ frontSrc, frontAlt, backText }, ref) => {
  return (
    <div
      ref={ref}
      className="card flip-card relative w-72 h-96 rounded-lg overflow-hidden shadow-xl bg-gray-900"
    >
      <div className="flip-card-inner w-full h-full">
        {/* Front Side */}
        <div className="flip-card-front absolute w-full h-full bg-cover bg-center">
          <img src={frontSrc} alt={frontAlt} className="w-full h-full" />
        </div>

        {/* Back Side */}
        <div className="flip-card-back absolute w-full h-full bg-indigo-700 flex items-center justify-center text-white text-xl font-bold transform rotate-y-180">
          {backText}
        </div>
      </div>
    </div>
  );
});

export default Card;
