import express from "express";
import * as userControllers from "../controllers/userController.js";
const route = express.Router();

route.get("/refresh_token", userControllers.refreshToken);

export default route;
