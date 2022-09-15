const express = require("express");
const loginRoute = express.Router();
const loginController = require("../Controllers/loginController");

loginRoute.post("/login", loginController);

module.exports = loginRoute;
