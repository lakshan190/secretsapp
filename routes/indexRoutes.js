"use strict";

import express from "express";
import {
  home,
  login,
  register,
  logOut,
} from "../controllers/indexController.js";
import { createUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", home);

router.get("/login", login).post("/login", loginUser);

router.get("/register", register).post("/register", createUser);

router.get("/logout", logOut);

export default router;
