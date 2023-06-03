"use strict";

import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import express from "express";
import { User } from "../models/users.js";

export const createUser = async function (req, res, next) {
  try {
    const { username, password } = req.body;
    //passport only accepts the username property name username dont add email name or anything else
    User.register({ username }, password, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const newUSer = new User({ username, password });

    //run below code as a middleware if it doesnt worn on the router
    req.login(newUSer, function (err) {
      //dont put two parameters for the callback function and res it will break the code
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
        //once authenticated passport sends the browser a cookie about the user to keep until its required
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const isUserLoggedIn = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.render("login");
    }
  } catch (err) {
    console.log(err);
  }
};

export const userSubmit = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      res.render("submit");
    } else {
      res.render("login");
    }
  } catch (err) {
    console.log(err);
  }
};

export const submittedSecret = async function (req, res, next) {
  try {
    const { secret } = req.body;
    //passport saves user in the request object req.user

    const user = await User.findById(req.user.id);
    //you need to use id not _id from mongodb because we use google and facebbok auth aswell

    if (user) {
      user.secret = secret;
      await user.save();
      res.redirect("/secrets");
    } else {
      console.log("cannot find user id");
    }
  } catch (err) {
    console.log(err);
  }
};

export const renderAllSecrets = async function (req, res, next) {
  try {
    const foundUsers = await User.find({ secret: { $ne: null } });
    //goes through all our users and picks out users where their secrets field isnt null

    if (foundUsers) {
      res.render("secrets", { usersWithSecrets: foundUsers });
    } else {
      console.log("No users with secrets");
    }
  } catch (err) {
    console.log(err);
  }
};
