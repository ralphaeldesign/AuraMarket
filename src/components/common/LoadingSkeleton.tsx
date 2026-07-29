import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm animate-pulse flex flex-col gap-3">
      <div className="bg-gray-200 h-48 w-full rounded-xl" />
      <div className="h-4 bg-gray-200 rounded w-1/3 mt-2" />
      <div className="h-5 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="h-6 bg-gray-200 rounded w-1/4" />
        <div className="h-9 bg-gray-200 rounded-lg w-1/3" />
      </div>
    </div>
  );
};

export const CategorySkeleton: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 animate-pulse flex flex-col items-center gap-3">
      <div className="w-16 h-16 bg-gray-200 rounded-full" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
    </div>
  );
};
