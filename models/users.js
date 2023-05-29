"use strict";

import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String },
  password: { type: String },
});

export const User = mongoose.model("User", userSchema);
