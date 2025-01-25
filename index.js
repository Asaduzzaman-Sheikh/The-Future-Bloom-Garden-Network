import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/users/user.route.js";
import productRoutes from "./src/products/products.route.js";
import reviewRoutes from './src/reviews/reviews.router.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;

// Middlewares...
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// All Routes...

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Database is connected!");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Exit process with failure
  }
};

//Routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to BLoooM!");
});

// Start the server after connecting to the database
const startServer = async () => {
  await connectDB(); // Connect to the database
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

// Initialize the server
startServer();
