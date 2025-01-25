// import React, { useState, useEffect } from "react";
// import { useGetProductsQuery } from "../../redux/features/products/productsAPI";
// import ProductsCard from "./ProductsCard";
// import { ShopFiltering } from "./ShopFiltering";


// const filters = {
//   categories: ["All", "Flowers", "Fruits", "Vegetables", "Medicinal Plants"],
//   rating: ["4+", "3+", "2+", "1+"],
// };

// export const ShopPage = () => {
//   const [filtersState, setFiltersState] = useState({
//     category: "All",
//     rating: "",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(8);

//   const { category, rating } = filtersState;

//   const {
//     data: { products = [], totalPage = 1, totalProducts = 0  } = {},
//     error,
//     isLoading,
//   } = useGetProductsQuery({
//     category: category !== "All" ? category : "",
//     rating: rating ? rating : "",
//     page: currentPage,
//     limit: productsPerPage,
//   });

//   const clearFilters = () => {
//     setFiltersState({
//       category: "All",
//       rating: "",
//     });
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPage) setCurrentPage(currentPage + 1);
//   };

//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   useEffect(() => {
//     console.log("Filtered Products:", products); // Debugging filtered products
//   }, [products]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error Loading Products!</div>;

//   const startProduct = (currentPage - 1) * productsPerPage + 1;
//   const endProduct = startProduct + products.length - 1;

//   return (
//     <>
//       <section className="section__container bg-primary-light">
//         <h2 className="section__header capitalize">Bloom Shop</h2>
//         <p className="section__subheader">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
//           vitae culpa vero, omnis possimus corporis, rerum harum delectus soluta
//           quo mollitia dolorem quidem perferendis? Repellat nulla est excepturi
//           porro delectus.
//         </p>
//       </section>
//       <section className="section__container">
//         <div className="flex flex-col md:flex-row md:gap-12 gap-8">
//           <ShopFiltering
//             filters={filters}
//             filtersState={filtersState}
//             setFiltersState={setFiltersState}
//             clearFilters={clearFilters}
//           />
//           <div>
//             <h3 className="text-xl font-medium mb-4">
//             Displaying items {startProduct} through {endProduct} of our carefully curated {totalProducts} products.

//             </h3>
//             <ProductsCard products={products} />

//             {/* Pagination Controls */}
//             <div className="mt-6 flex justify-center">
//               <button
//                 onClick={handlePrevious}
//                 disabled={currentPage === 1}
//                 className={`px-4 py-2 ${
//                   currentPage === 1
//                     ? "bg-gray-300 text-gray-400 cursor-not-allowed"
//                     : "bg-gray-300 text-gray-700 hover:bg-gray-400"
//                 } rounded-md mr-2`}
//               >
//                 Previous
//               </button>

//               {[...Array(totalPage)].map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handlePageClick(index + 1)}
//                   className={`px-4 py-2 ${
//                     currentPage === index + 1
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-300 text-gray-700 hover:bg-gray-400"
//                   } rounded-md mx-1`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}

//               <button
//                 onClick={handleNext}
//                 disabled={currentPage === totalPage}
//                 className={`px-4 py-2 ${
//                   currentPage === totalPage
//                     ? "bg-gray-300 text-gray-400 cursor-not-allowed"
//                     : "bg-gray-300 text-gray-700 hover:bg-gray-400"
//                 } rounded-md ml-2`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

import React, { useState, useEffect } from "react";
import { useGetProductsQuery } from "../../redux/features/products/productsAPI";
import ProductsCard from "./ProductsCard";
import { ShopFiltering } from "./ShopFiltering";

const filters = {
  categories: ["All", "Flowers", "Fruits", "Vegetables", "Medicinal Plants"],
  rating: ["4+", "3+", "2+", "1+"],
};

export const ShopPage = () => {
  const [filtersState, setFiltersState] = useState({
    category: "All",
    rating: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const { category, rating } = filtersState;

  const {
    data: { products = [], totalProducts = 0 } = {},
    error,
    isLoading,
  } = useGetProductsQuery({
    category: category !== "All" ? category : "",
    rating: rating ? rating : "",
    page: currentPage,
    limit: productsPerPage,
  });

  const totalPage = Math.ceil(totalProducts / productsPerPage);

  const clearFilters = () => {
    setFiltersState({
      category: "All",
      rating: "",
    });
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPage) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    console.log("Filtered Products:", products); // Debugging filtered products
  }, [products]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Products!</div>;

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Bloom Shop</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          vitae culpa vero, omnis possimus corporis, rerum harum delectus soluta
          quo mollitia dolorem quidem perferendis? Repellat nulla est excepturi
          porro delectus.
        </p>
      </section>
      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />
          <div>
            <h3 className="text-xl font-medium mb-4">
              Displaying items {startProduct} through {endProduct} of our carefully curated {totalProducts} products.
            </h3>

            {/* Show products if available, otherwise display a no products found message */}
            {products.length === 0 ? (
              <p>No products found based on your filters.</p>
            ) : (
              <ProductsCard products={products} />
            )}

            {/* Pagination Controls */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-4 py-2 ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-gray-400"
                } rounded-md mr-2`}
              >
                Previous
              </button>

              {[...Array(totalPage)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClick(index + 1)}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  } rounded-md mx-1`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPage}
                className={`px-4 py-2 ${
                  currentPage === totalPage
                    ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-gray-400"
                } rounded-md ml-2`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
