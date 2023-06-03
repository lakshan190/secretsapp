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
  userSubmit,
  submittedSecret,
  renderAllSecrets,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", home);

router.get("/login", login).post("/login", loginUser);

router.get("/register", register).post("/register", createUser);

router.get("/logout", logOut);

router.get("/secrets", isUserLoggedIn, renderAllSecrets);

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

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/secrets",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
  }
);

router.get("/submit", userSubmit).post("/submit", submittedSecret);

export default router;
