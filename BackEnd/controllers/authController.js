// used to encrypt passwords
const bcrypt = require("bcryptjs");
// used to verify if a user is authenticated
const jwt = require("jsonwebtoken");
// used to encrypt token for user password reset
const crypto = require("crypto");
// for sending emails to user
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const { validationResult } = require("express-validator");

require("dotenv").config();

const User = require("../models/user.js");

// from documentation integration to hold api key from send grid
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID,
    },
  })
);
exports.signup = async (req, res, next) => {
  //with the express.json parser in server.js we can parse incoming body req
  //   from the frontend form tags

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email.toLowerCase();
  const name = req.body.name;
  const password = req.body.password;
  try {
    const checkUser = await User.findOne({ email: email });
    // throw err if user exist already
    if (checkUser) {
      const error = new Error("This email is already in use");
      error.statusCode = 409;
      throw error;
    }
    // encrypt password from body
    const hashedPass = await bcrypt.hash(password, 12);

    // create a new user based on the model schema
    const user = new User({
      email: email,
      password: hashedPass,
      name: name,
    });

    // save the user to the database for login later
    const result = await user.save();
    transporter.sendMail({
      to: email,
      from: "cognizantecommercecapstone@gmail.com",
      subject: "Signup succeeded!",
      html: "<h1>You have successfully signed up!</h1>",
    });
    // send message to frontend along with the user_id
    res.status(201).json({ message: "Account created", userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    // checking for user if they exist in db
    const user = await User.findOne({ email: email });
    // throw err if user not found
    if (!user) {
      const error = new Error("No user with this email exist");
      error.statusCode = 401;
      throw error;
    }

    // compare encrypted passwords
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      throw error;
    }

    // send token to verify authentication
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JPASS
      // { expiresIn: "1h" }
    );
    res.status(200).json({ token: token, userId: user.id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// if errors start spurring out check this function since i switched the async
exports.reset = (req, res, next) => {
  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      throw err;
    }
    // token encryption
    const cryptoToken = buffer.toString("hex");
    try {
      // check if email is in db
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        const error = new Error("No user with this email exist");
        error.statusCode = 401;
        throw error;
      }
      // if user is found then rewrite data
      user.resetToken = cryptoToken;
      user.resetTokenExpiration = Date.now() + 3600000;
      await user.save();
      // send email for password reset
      await transporter.sendMail({
        to: req.body.email,
        from: "cognizantecommercecapstone@gmail.com",
        subject: "Password reset",
        html: `
          <p>You requested a password reset</p>
          <p>Click this <a href="https://sense-clothing.herokuapp.com/auth/newpass/${cryptoToken}">link</a> to set a new password.</p>
        `,
      });
      res.status(200).json({ message: "Reset has been sent to email" });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  });
};

exports.getNewPass = async (req, res, next) => {
  const token = req.params.token;
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      const error = new Error("Token is expired, Please reset again");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ cryptoToken: token, userId: user._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateNewPass = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const cryptoToken = req.body.cryptoToken;
  const newPass = req.body.password;
  const userId = req.body.userId;

  try {
    //   find a user with the following
    const user = await User.findOne({
      resetToken: cryptoToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId,
    });

    if (!user) {
      const error = new Error("Token is expired, Please reset again");
      error.statusCode = 401;
      throw error;
    }

    // hash the newpass for db
    const hashPass = await bcrypt.hash(newPass, 12);
    user.password = hashPass;
    // reset token for user
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    res.status(201).json({ message: "Password Updated Successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
