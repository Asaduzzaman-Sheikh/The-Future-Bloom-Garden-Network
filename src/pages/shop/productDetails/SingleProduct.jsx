import React from "react";
import { Link, useParams } from "react-router-dom";
import RatingStar from "../../../components/RatingStar";
import { useDispatch } from "react-redux";
import { useGetProductByIdQuery } from "../../../redux/features/products/productsAPI";
import { increment } from "../../../redux/features/cart/cartSlice";
import { ReviewsCard } from "../reviews/ReviewsCard";

export const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const singleProduct = data?.product || {};
  // console.log(singleProduct)
  const productReviews = data?.reviews || [];
  // console.log(productReviews)

  const handleAddToCart = (product)=>{
    dispatch(increment(product))
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error Loading Product Details...</p>;

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{singleProduct?.name}</h2>
        <div className="section__subheader space-x-2">
          <span>
            <Link to="/">Home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span>
            <Link to="/shop">Bloom Shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">{singleProduct?.name}</span>
        </div>
      </section>
      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          <div className="md:w-1/2 w-full">
            <img
              src={singleProduct?.image}
              alt={singleProduct?.name || "Product"}
              className="rounded-md w-80 h-80 object-cover mx-auto"
            />
          </div>

          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">
              {singleProduct?.name}
            </h3>
            <p className="text-xl text-primary mb-4">
              ${singleProduct?.price}
              {singleProduct?.oldPrice && (
                <s className="ml-2 text-gray-500">${singleProduct?.oldPrice}</s>
              )}
            </p>
            <p className="text-gray-400 mb-4">{singleProduct?.description}</p>

            {/* Additional Product Info */}
            <div>
              <p>
                <strong>Category: </strong> {singleProduct?.category}
              </p>
              <div className="flex gap-1 items-center">
                <strong>Rating: </strong>
                <RatingStar rating={singleProduct?.rating} />
              </div>
              <button className="mt-6 px-6 py-3 bg-primary text-white rounded"onClick={(e)=> {
                e.stopPropagation()
                handleAddToCart(singleProduct)
              }}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="section__container mt-8">
        <ReviewsCard productReviews = {productReviews}/>
      </section>
    </>
  );
};
