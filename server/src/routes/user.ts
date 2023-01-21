import { Router } from "express";
import {
  checker,
  loginUser,
  logOut,
  registerUser,
} from "../controllers/auth.controller";
import {
  getAllUser,
  getUserFromID,
  getUserFromUserName,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth";
const router = Router();

/*
    THIS ROUTE IS FOR GETTING ALL THE USERS
    REQUEST TYPE : GET
    API Route : {url}/api/user/all
 */
router.get("/all", verifyToken, getAllUser);

/*
    THIS ROUTE IS FOR GETTING ONE USER WITH HIS UNIQUE ID
    REQUEST TYPE : GET
    API Route : {url}/api/user/:id
 */
router.get("/:id", verifyToken, getUserFromID);

/*
    THIS ROUTE IS FOR GETTING ONE USER WITH HIS UNIQUE USERNAME
    REQUEST TYPE : GET
    API Route : {url}/api/user/username/:user
 */

router.get("/username/:user", verifyToken, getUserFromUserName);

export default router;
