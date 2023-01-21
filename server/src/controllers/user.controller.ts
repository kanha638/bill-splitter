import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        profile_urn: true,
      },
    });
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Some Error Occured in backend" });
  }
};

export const getUserFromID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        profile_urn: true,
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Some Error Occured in backend" });
  }
};

export const getUserFromUserName = async (req: Request, res: Response) => {
  try {
    const { user } = req.params;
    const userData = await prisma.users.findUnique({
      where: {
        username: user,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        profile_urn: true,
      },
    });
    return res.json(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Some Error Occured in backend" });
  }
};
