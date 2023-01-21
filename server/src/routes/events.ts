import { Router } from "express";
import {
  acceptInvite,
  createEvent,
  getAllMyEvents,
  getInvitationsForUser,
} from "../controllers/events.controller";
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

/*
    THIS ROUTE IS FOR ACCEPTING THE INVITATION BY USER
    REQUEST TYPE : GET 
    API Route : {url}/api/event/invitations/my

 */
router.get("/invitations/my", verifyToken, getInvitationsForUser);

/*
    THIS ROUTE IS FOR GETTING ALL THE EVENTS ASSOCIATED WITH A USER
    REQUEST TYPE : GET 
    API Route : {url}/api/event/events/my

 */
router.get("/events/my", verifyToken, getAllMyEvents);

export default router;
