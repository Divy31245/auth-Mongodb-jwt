import mongoose from "mongoose";
import userSchema from "../models/model.js";
import jwt from "jsonwebtoken";
import Joi from "joi";
import bcrypt from "bcryptjs";

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

export const loginController = async (req, res) => {
  // validating login credentials
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //finding user
  const user = userSchema.findOne({ email: req.body.email });
  if (!user) res.status(400).send("Email or password is wrong");

  //checking if the password is correct
  const validPass = bcrypt.compare(req.body.password, user.password);
  if (!validPass) res.status(400).send("email or password is wrong");

  //assigning token and sending to the browser
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
  res.header("auth-token", token).send(token);
};
