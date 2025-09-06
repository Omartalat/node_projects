const catchAsync = require("../utils/catchAsync");
const sendResponse = require("../utils/sendResponse");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  return token;
};
exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.validatedBody);

  const token = await createToken(user);
  sendResponse(res, 201, user, token, "user created Successfully.");
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return sendResponse(
      res,
      400,
      null,
      null,
      "please provide your email and password.",
      true
    );

  const user = await User.find({ email }).select("+password");
});
