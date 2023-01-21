import { Router } from "express";
import {
  createExpense,
  getAllExpensesOfEvents,
} from "../controllers/expense.controller";
import { verifyToken } from "../middlewares/auth";
const router = Router();

/* THIS ROUTE IS FOR COMMONG REGISTER OF A USER
   REQUEST TYPE : POST 
   API Route : {url}/api/expense/create
   body :
   {
    eventID : "",
    description:"", 
    total_amount: "",(INT)
    buyers : [],   ({ userID:"",amount_spent:""})
    payers : []     ({ userID:"",amount_paid:""})
   }
*/

router.post("/create", verifyToken, createExpense);

/*
    THIS ROUTE IS FOR GETTING ALL THE EXPENSES ASSOCIATED WITH AN EVENT
    REQUEST TYPE : GET 
    API Route : {url}/api/expense/all/:eventID
 */

router.get("/all/:eventID", verifyToken, getAllExpensesOfEvents);

export default router;
