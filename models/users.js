"use strict";
import * as dotenv from "dotenv";

import mongoose from "mongoose";
import { Schema } from "mongoose";

const secret = process.env.SECRET || "helloBaBy";

const userSchema = new Schema({
  email: { type: String },
  password: { type: String },
});

export const User = mongoose.model("User", userSchema);
