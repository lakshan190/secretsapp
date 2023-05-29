"use strict";

export const home = async function (req, res, next) {
  try {
    res.render("home");
  } catch (err) {
    console.error(err);
  }
};

export const login = async function (req, res, next) {
  try {
    res.render("login");
  } catch (err) {
    console.error(err);
  }
};

export const register = async function (req, res, next) {
  try {
    res.render("register");
  } catch (err) {
    console.error(err);
  }
};

export const logOut = async function (req, res, next) {
  try {
    res.render("home");
  } catch (err) {
    console.error(err);
  }
};
