"use strict";
import * as dotenv from "dotenv";

import mongoose from "mongoose";
import { Schema } from "mongoose";
import encrypt from "mongoose-encryption";

const secret = process.env.SECRET || "helloBaBy";

const userSchema = new Schema({
  email: { type: String },
  password: { type: String },
});

userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

export const User = mongoose.model("User", userSchema);
