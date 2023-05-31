"use strict";
import * as dotenv from "dotenv";

import mongoose from "mongoose";
import { Schema } from "mongoose";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

const secret = process.env.SECRET || "helloBaBy";

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
});

//this plugin allows to hash and salt the passwords and save it to the mongodb database
userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model("User", userSchema);

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
