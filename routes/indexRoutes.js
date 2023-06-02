"use strict";

import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import { User } from "../models/users.js";
import {
  home,
  login,
  register,
  logOut,
} from "../controllers/indexController.js";
import {
  createUser,
  loginUser,
  isUserLoggedIn,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", home);

router.get("/login", login).post("/login", loginUser);

router.get("/register", register).post("/register", createUser);

router.get("/logout", logOut);

router.get("/secrets", isUserLoggedIn);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
  }
);

export default router;
