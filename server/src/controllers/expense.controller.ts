import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { eventID, desc, total_amount, buyers, payers } = req.body;

    const check = await prisma.event.findFirst({
      where: {
        AND: [
          { id: eventID },
          {
            active_users: {
              has: res.locals.user.id,
            },
          },
        ],
      },
    });

    if (!check) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const expenseData = await prisma.expense.create({
      data: {
        eventID: eventID,
        desc: desc,
        total_amount: parseFloat(total_amount),
        createrID: res.locals.user.id,
        createdAt: new Date(),
      },
    });

    buyers.forEach(async (element: any) => {
      const buyerData = await prisma.buyers.create({
        data: {
          userID: element.userID,
          amount_spent: element.amount_spent,
          expenseId: expenseData.id,
        },
      });
    });
    payers.forEach(async (element: any) => {
      const payersData = await prisma.payers.create({
        data: {
          userID: element.userID,
          amount_paid: element.amount_paid,
          expenseId: expenseData.id,
        },
      });
    });

    const finalExpenseData = await prisma.expense.findUnique({
      where: {
        id: expenseData!.id,
      },
      select: {
        buyers: {
          select: {
            id: true,
            userID: true,
            amount_spent: true,
          },
        },
        payers: {
          select: {
            id: true,
            userID: true,
            amount_paid: true,
          },
        },
        desc: true,
        total_amount: true,
      },
    });
    return res.json(finalExpenseData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Some Error Occured in backend" });
  }
};

export const getAllExpensesOfEvents = async (req: Request, res: Response) => {
  try {
    const { eventID } = req.params;

    const check = await prisma.event.findFirst({
      where: {
        AND: [
          { id: eventID },
          {
            active_users: {
              has: res.locals.user.id,
            },
          },
        ],
      },
    });

    if (!check) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const expenses = await prisma.expense.findMany({
      where: {
        eventID: eventID,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Some Error Occured in backend" });
  }
};
