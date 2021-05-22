import bcrypt from "bcryptjs"; // Bcrypt is used to hash the password (protect)
import jwt from "jsonwebtoken"; // Keep user signed in for some period of time

// Collection
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find if user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    // Check pwd
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // If password is wrong
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // If password is correct and user exists

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    // find user
    const existingUser = await User.findOne({ email });

    // If user exists
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // If passwords match
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    // If all good
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const result = await User.create({
      email,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
