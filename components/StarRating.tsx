'use client'
import React, { useState } from 'react'

type Props = {
  rate: number
  id: number 
}

export default function StarRating({ rate, id }: Props) {
  const [selectedRate, setSelectedRate] = useState(Math.floor(rate));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async (value: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectedRate(value); 
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/products/${id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rate: value }),
      });

      if (!res.ok) {
        
        alert('Failed to update rating')
      }

      const data = await res.json();
      console.log('Rating updated:', data);
    } catch (err) {
      console.error(err);

      setSelectedRate(Math.floor(rate));
    } finally {
      setIsSubmitting(false);
    }
  };

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1 cursor-pointer">
      {stars.map((star) => (
        <span
          key={star}
          onClick={(e) => handleClick(star, e)}
          className={`text-xl transition-colors ${
            star <= selectedRate ? 'text-yellow-400' : 'text-gray-300'
          } ${isSubmitting ? 'cursor-wait' : 'hover:scale-125'}`}
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-gray-600 text-sm">({selectedRate})</span>
    </div>
  );
}
