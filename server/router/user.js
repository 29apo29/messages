const express = require("express");
const tokenHandler = require("../middleware/token/tokenMiddleware");
const { related, editInfo, passwordUpdate } = require("../controler/router/user");
const route = express.Router();

route.get("/related", tokenHandler, related);
route.post("/editinfo", tokenHandler, editInfo);
route.post("/passwordupdate",tokenHandler,passwordUpdate);

module.exports = route;
