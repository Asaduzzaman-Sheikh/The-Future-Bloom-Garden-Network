import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../redux/features/products/productsAPI";
import { useAddReviewMutation } from "../../../redux/features/reviews/reviewsApi";

const PostAReview = ({ isModalOpen, handleClose }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0); // Rating state
  const [comment, setComment] = useState(""); // Comment state

  const { refetch } = useGetProductByIdQuery(id, { skip: !id });
  const [postReview] = useAddReviewMutation();

  const handleRating = (value) => {
    setRating(value); // Set rating value
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    const newComment = {
      comment: comment,
      rating: rating,
      userId: user._id,
      productId: id,
    };

    try {
      const response = await postReview(newComment).unwrap();
      alert("Review Posted Successfully!");

      setComment(""); // Reset comment
      setRating(0); // Reset rating
      refetch(); // Refetch product details
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error posting review:", error);
      const errorMessage = error?.data?.message || "Failed to post review.";
      alert(errorMessage); // Show error message
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-medium mb-4">Post a Review</h2>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className="cursor-pointer text-lg"
            >
              {rating >= star ? (
                <i className="ri-star-fill text-yellow-500"></i>
              ) : (
                <i className="ri-star-line text-gray-400"></i>
              )}
            </span>
          ))}
        </div>
        <textarea
          name="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full border-gray-300 rounded-md mb-4"
          placeholder="Write your review here..."
        ></textarea>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;
