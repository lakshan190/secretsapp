"use strict";

import passport from "passport";
import session from "express-session";
import { User } from "../models/users.js";
import bcrypt from "bcrypt";

const hashPw = async function (pw) {
  const hash = await bcrypt.hash(pw, 12);
  return hash;
};

export const createUser = async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const newUser = new User({
      email: username,
      password: await hashPw(password),
    });

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
    const hashCompare = await bcrypt.compare(password, foundUser.password);
    if (hashCompare) {
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
