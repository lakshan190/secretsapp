"use strict";

import express from "express";
import passport from "passport";
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

export default router;
