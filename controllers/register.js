import userSchema from "../models/model.js";
import Joi from "joi";
import  bcrypt from 'bcryptjs'


const registerSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

export const regController = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
 
//   check it user already exists
  const alreadyExists = await userSchema.findOne({ email: req.body.email });

  if (alreadyExists) res.status(400).send("Email already exists....");
 
  //hashing the password using bcrypt js
  var saltRounds = 10;
  var salt =  bcrypt.genSaltSync(saltRounds);
  var hashPassword =  bcrypt.hashSync(req.body.password, salt);
  //now posting the user json to the server
  const newUser = new userSchema({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
