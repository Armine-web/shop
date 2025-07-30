import React from 'react'

export default function StarRating ({ rate }: { rate: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <span key={star} className={`text-xl ${star <= Math.floor(rate) ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      ))}
      <span className="ml-2 text-gray-600 text-sm">({rate})</span>
    </div>
  );
};
