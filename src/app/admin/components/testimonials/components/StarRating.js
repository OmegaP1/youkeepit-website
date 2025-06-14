// src/app/admin/components/testimonials/components/StarRating.js
"use client";

import { Star } from "lucide-react";

export default function StarRating({ rating, onRatingChange, readOnly = false }) {
  const handleStarClick = (starRating) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= rating 
              ? "text-yellow-400 fill-current" 
              : "text-gray-300"
          } ${!readOnly ? "cursor-pointer hover:text-yellow-400" : ""}`}
          onClick={() => handleStarClick(star)}
        />
      ))}
    </div>
  );
}