import express from "express";
import Products from "./products.model.js";
import Reviews from "../reviews/reviews.model.js";
import tokenVerification from "../middlewares/tokenVerification.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import mongoose from "mongoose";

const router = express.Router();

// Post a product..
router.post("/createProduct", async (req, res) => {
  try {
    const newProduct = new Products({
      ...req.body,
    });
    const savedProduct = await newProduct.save();

    // Calculate Review...
    const reviews = await Reviews.find({ productId: savedProduct._id });
    if (!reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRtaing = totalRating / reviews.length;
      savedProduct.rating = averageRtaing;
      await savedProduct.save();
    }
    res.status(201).send(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "An error occurred while creating the product",
      error: error.message,
    });
  }
});

// Get All Products...
router.get("/", async (req, res) => {
  try {
    const { category, page = 1, limit = 10, rating } = req.query;

    let filter = {};
    if (category && category !== "All") {
      filter.category = category;
    }
    if (rating) {
      filter.rating = { $gte: parseFloat(rating) };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Products.countDocuments(filter);
    const totalPage = Math.ceil(totalProducts / parseInt(limit));

    const products = await Products.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "email")
      .sort({ createdAt: -1 });

    res.status(200).send({
      products,
      totalPage,
      totalProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "An error occurred while fetching the products",
      error: error.message,
    });
  }
});

// Get Single Products..
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: "Invalid Product ID" });
    }

    // Find the product and populate 'author'
    const product = await Products.findById(productId).populate(
      { path: "author", select: "email username" } // Select only necessary fields
    );

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Find reviews for the product and populate 'userId'
    const reviews = await Reviews.find({ productId }).populate(
      { path: "userId", select: "username email" } // Select only necessary fields
    );

    // Send the product and reviews as a combined response
    res.status(200).send({ product, reviews });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send({
      message: "An error occurred while fetching the product",
      error: error.message,
    });
  }
});

// Update a product..
router.patch(
  "/updateProduct/:id",
  tokenVerification,
  verifyAdmin,
  async (req, res) => {
    try {
      const productId = req.params.id;

      // Validate Product ID
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).send({ message: "Invalid Product ID" });
      }

      // Validate request body to allow only specific fields to be updated
      const allowedUpdates = ["name", "price", "description", "category", "image"];
      const updates = Object.keys(req.body);
      const isValidOperation = updates.every((field) => allowedUpdates.includes(field));

      if (!isValidOperation) {
        return res.status(400).send({
          message: "Invalid updates. Allowed fields: name, price, description, category, image",
        });
      }

      // Update the product
      const updatedProduct = await Products.findByIdAndUpdate(
        productId,
        { $set: req.body }, // Use $set to update only specified fields
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).send({ message: "Product not found" });
      }

      // Send success response
      res.status(200).send({
        message: "Product updated successfully",
        updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send({
        message: "An error occurred while updating the product",
        error: error.message,
      });
    }
  }
);


// Delete a product..
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id
    const deletedProduct = await Products.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).send({
        message: "Product not found",
      });
    }
    // Delete all the reviews related to the product...
    await Reviews.deleteMany({ productId:productId});
    res.status(200).send({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "An error occurred while deleting the product",
      error: error.message,
    });
  }
});

// Get related products..
router.get("/related/:id", async (req, res) => {
  try {
    const {id} = req.params
    if (!id) {
      return res.status(400).send({
        message: "Product ID is required",
      });
    }
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).send({
        message: "Product not found",
      });
    }
    const titleRegex = new RegExp(
      product.name
        .split(" ")
        .filter((word) => word.length > 1)
        .join("|"),
      "i"
    );
    const relatedProducts = await Products.find({
      _id: { $ne: id },
      $or: [{ name: { $regex: titleRegex } }, { category: product.category }],
    });
    res.status(200).send(relatedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "An error occurred while fetching related products",
      error: error.message,
    });
  }
});

export default router;
