import React, { useState } from "react";
import userAvater from "../../../assets/images/avatar.png";
import RatingStar from "../../../components/RatingStar";
import PostAReview from "./PostAReview";
import formateDate from "../../../utils/formateDate";

export const ReviewsCard = ({productReviews}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviews = productReviews;

  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="my-6 bg-white p-8">
      <div>
        {reviews.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium">All Comments...</h3>
            <div>
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="mt-4 flex gap-4 items-start border-b pb-4"
                >
                  {/* User Avatar */}
                  <img
                    src={userAvater}
                    alt="User Avatar"
                    className="w-14 h-14 rounded-full"
                  />

                  {/* User Info and Comment */}
                  <div className="flex flex-col space-y-2 w-full">
                    <div>
                      <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400">
                        {review?.userId?.username}
                      </p>
                      <p className="text-lg font-medium text-red-300">
                        {review?.userId?.email }
                      </p>
                      <p>{formateDate(review?.updatedAt)}</p>
                      <RatingStar rating={review?.rating} />
                    </div>

                    {/* Comment Section */}
                    <div className="text-gray-600 border p-4 rounded-md">
                      <p className="md:w-full">{review?.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No Review Yet!</p>
        )}
      </div>

      {/* Add review button */}
      <div className="mt-12">
        <button
          onClick={handleOpenReviewModal}
          className="px-6 py-3 bg-primary text-white rounded-md"
        >
          Add a Review
        </button>
      </div>

      {/* Review Modal */}
      <PostAReview
        isModalOpen={isModalOpen}
        handleClose={handleCloseReviewModal}
      />
    </div>
  );
};
