import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    min: 6,
    max: 255,
  },
  email: {
    required: true,
    type: String,
    min: 6,
    max: 255,
  },
  password: {
    required: true,
    type: String,
    min: 6,
    max: 2048,
  },
  date:{
    type:Date,
    default:Date.now,
  }
});

const userSchema = mongoose.model("users",user);

export default userSchema;
