import { Router } from "express";
import {
  loginUser,
  logOut,
  registerUser,
} from "../controllers/auth.controller";

const router = Router();

/* THIS ROUTE IS FOR COMMONG REGISTER OF A USER
   REQUEST TYPE : POST 
   API Route : {url}/api/auth/register
   body :
   {
    firstName : "",
    lastName : "",
    mobileNum : "",
    email : "",
    password : ""
   }
*/

router.post("/register", registerUser);

/* THIS ROUTE IS FOR COMMONG LOGIN OF A USER
   REQUEST TYPE : POST 
   API Route : {url}/api/auth/login
   body :
   {
    email : "",
    password : ""
   }
*/
router.post("/login", loginUser);

/* THIS ROUTE IS FOR COMMON LOGOUT OF A USER
   REQUEST TYPE : GET
   API Route : {url}/api/auth/logout
*/
router.get("/logout", logOut);
export default router;
