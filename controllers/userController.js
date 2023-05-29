"use strict";

import passport from "passport";
import session from "express-session";
import { User } from "../models/users.js";

export const createUser = async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const newUser = new User({ email: username, password });

    await newUser.save();
    console.log(newUser);
    res.render("login");
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ email: username });
    if (foundUser.password === password) {
      req.session.userId = foundUser._id;
      console.log(req.session.userId);
      res.render("secrets");
    } else {
      res.send("User not found!!!");
    }
  } catch (err) {
    console.log(err);
  }
};
