import express from "express";
import User from "./user.model.js";
import tokenGeneration from "../middlewares/tokenGeneartion.js";
import tokenVerification from "../middlewares/tokenVerification.js";
const router = express.Router();

// Sign Up Endpoint....(Create Operation)
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ error: "All fields are required" });
  }
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).send({ message: "User created successfully" });
    // console.log(req.body)
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).send({ error: error.message });
  }
});

// Login User Endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    // console.log(user)
    if (!user) {
      return res.status(401).send({ message: "Invalid User" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }
    // Generate the token
    const token = await tokenGeneration(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    // If successful, respond with a success message or token
    res
      .status(200)
      .send({
        message: "Login Successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
          profileImage: user.profileImage,
          bio: user.bio,
          profession: user.profession,
        },
      });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// All Users...(Read Operation)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "id email role").sort({ createdAt: -1 });
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Error fetching users" });
  }
});

// Log Out Endpoint...
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Successfully Logged Out!" });
});

// Delete a user...(Delete Operation)
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    //Check if user not found...
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error during user deletion:", error);
    res.status(500).send({ message: "Error during user deletion" });
  }
});

// Update the users role...(Update Operation)
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Find the user by ID and update the role
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    // Check if user not found
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Error during user role update:", error);
    res.status(500).send({ message: "Error during user role update" });
  }
});

// Update Profile Picture...(Update Operation)
router.patch("/editProfilePicture", async (req, res) => {
  try {
    const { userId, username, profileImage, bio, profession } = req.body;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }
    const user = await User.findById(userId);

    // Check if user not found
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (username !== undefined) {
      user.username = username;
    }
    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }
    if (bio !== undefined) {
      user.bio = bio;
    }
    if (profession !== undefined) {
      user.profession = profession;
    }
    await user.save();
    res.status(200).send({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      },
    });
  } catch (error) {
    console.error("Error during profile picture update:", error);
    res.status(500).send({ message: "Error during profile picture update" });
  }
});
export default router;
