const { Schema, model } = require("mongoose");
const Joi = require("joi");

const subscription = ["starter", "pro", "business"];

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscription,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const register = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const login = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string().required(),
});

const updateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscription)
    .required(),
});

const schemas = {
  register,
  login,
  updateSubscription,
};

const User = model("user", userSchema);

module.exports = { User, schemas };