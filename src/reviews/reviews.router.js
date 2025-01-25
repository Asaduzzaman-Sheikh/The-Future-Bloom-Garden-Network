import express from "express";
import Reviews from "./reviews.model.js";
import Products from "../products/products.model.js";

const router = express.Router();

// Post a new review or update an existing one
router.post("/postReview", async (req, res) => {
  try {
    const { comment, rating, userId, productId } = req.body;

    // Validate the input
    if (!comment || !rating || !userId || !productId) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const existingReview = await Reviews.findOne({ productId, userId });

    if (existingReview) {
      // Update the existing review
      existingReview.comment = comment;
      existingReview.rating = rating;
      await existingReview.save();
    } else {
      // Create a new review
      const newReview = new Reviews({
        comment,
        rating,
        productId,
        userId,
      });
      await newReview.save();
    }

    // Calculate average rating
    const reviews = await Reviews.find({ productId });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;

      const product = await Products.findById(productId);
      if (product) {
        product.rating = averageRating;
        await product.save({ validateBeforeSave: false });
      } else {
        return res.status(404).send({ message: "Product Not Found!" });
      }
    }

    res.status(200).send({
      message: "Review posted successfully.",
      review: reviews, // Send the correct review object
    });
  } catch (error) {
    console.error("Error Posting Review", error);
    res.status(500).json({
      message: "An error occurred while posting the review.",
      error: error.message,
    });
  }
});

// Get total reviews count
router.get("/totalReviews", async (req, res) => {
  try {
    const totalReviews = await Reviews.countDocuments({});
    res.status(200).send({ totalReviews });
  } catch (error) {
    console.error("Error fetching total reviews count", error);
    res.status(500).send({
      message: "An error occurred while fetching the total reviews count.",
      error: error.message,
    });
  }
});

// Get reviews by user Id
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send({ message: "User ID is required." });
  }
  try {
    const reviews = await Reviews.find({ userId }).sort({
      createdAt: -1,
    });

    if (reviews.length === 0) {
      return res
        .status(404)
        .send({ message: "No reviews found for this user." });
    }

    res.status(200).send(reviews);
  } catch (error) {
    console.error("Error fetching user reviews", error);
    res.status(500).send({
      message: "An error occurred while fetching the user reviews.",
      error: error.message,
    });
  }
});

export default router;
