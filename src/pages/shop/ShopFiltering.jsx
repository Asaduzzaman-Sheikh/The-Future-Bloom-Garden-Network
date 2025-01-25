import React from "react";

export const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
  // Handle category change
  const handleCategoryChange = (e) => {
    setFiltersState({ ...filtersState, category: e.target.value });
  };

  // Handle rating change
  const handleRatingChange = (e) => {
    setFiltersState({ ...filtersState, rating: e.target.value });
  };

  return (
    <div>
      <h4 className="text-2xl font-bold text-blue-600 mb-6 hover:text-red-500 transition-colors duration-300">
        Filters
      </h4>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2 hover:text-blue-600 transition-colors duration-300">
          Category
        </label>
        <div className="flex flex-col space-y-2">
          {filters.categories.map((category) => (
            <label key={category} className="inline-flex items-center">
              <input
                type="radio"
                value={category}
                checked={filtersState.category === category}
                onChange={handleCategoryChange}
                className="form-radio text-blue-600 mr-2"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2 hover:text-blue-600 transition-colors duration-300">
          Rating
        </label>
        <div className="flex flex-col space-y-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value=""
              checked={filtersState.rating === ""}
              onChange={handleRatingChange}
              className="form-radio text-blue-600 mr-2"
            />
            <span className="text-gray-700">All Ratings</span>
          </label>
          {filters.rating.map((rating) => (
            <label key={rating} className="inline-flex items-center">
              <input
                type="radio"
                value={rating}
                checked={filtersState.rating === rating}
                onChange={handleRatingChange}
                className="form-radio text-blue-600 mr-2"
              />
              <span className="text-gray-700">{rating}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-red-500 hover:scale-105 focus:outline-none"
      >
        Clear Filters
      </button>
    </div>
  );
};
