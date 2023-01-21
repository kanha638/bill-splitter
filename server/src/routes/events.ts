import { Router } from "express";
import {
  checker,
  loginUser,
  logOut,
  registerUser,
} from "../controllers/auth.controller";
import { acceptInvite, createEvent } from "../controllers/events.controller";
import {
  getAllUser,
  getUserFromID,
  getUserFromUserName,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth";
const router = Router();

/* THIS ROUTE IS FOR COMMONG REGISTER OF A USER
   REQUEST TYPE : POST 
   API Route : {url}/api/event/create
   body :
   {
    name : "",
    desc : "",
    invitedUsers :[],
   }
*/

router.post("/create", verifyToken, createEvent);

/*
    THIS ROUTE IS FOR ACCEPTING THE INVITATION BY USER
    REQUEST TYPE : POST 
    API Route : {url}/api/event/invite/accept
    body :
    {
        token : "", 
    }
 */
router.post("/invite/accept", verifyToken, acceptInvite);

export default router;
