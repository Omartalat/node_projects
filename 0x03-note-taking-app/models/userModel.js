const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      default: "",
      minLength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      default: "",
      minLength: 8,
      validate: {
        validator: function (val) {
          return this.password === val;
        },
        message: "password and password confirm does not match.",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function(next){
  if (!this.isModified)
})

const User = mongoose.model("User", userSchema);

module.exports = User;
