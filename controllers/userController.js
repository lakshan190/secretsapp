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
      res.render("secrets");
    } else {
      res.render("login");
    }
  } catch (err) {
    console.log(err);
  }
};
