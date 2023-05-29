"use strict";

import express from "express";
import ejsMate from "ejs-mate";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import { ExpressError } from "./utils/expressError.js";
import session from "express-session";

import { default as homeRoute } from "./routes/indexRoutes.js";

const app = express();
const __dirname = path.resolve();

main()
  .then(() => {
    console.log("Mongo connection open!");
    console.log("connected to secrets db");
  })
  .catch((err) => console.log(err, " Mongo connection error!"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/secrets", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configure session
app.use(
  session({
    secret: "bambinaBambinoLife",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", homeRoute);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found!", 404));
});

//generic error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no, something went wrong!!!";
  //have to put title something to prevent the boilerplate error on error.ejs
  res.status(statusCode).send(`Error ${err.message}, ${err.statusCode}`);
});

app.listen(3000, function () {
  console.log("listening on port 3000");
});
