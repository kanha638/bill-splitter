import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

/* Controller for Registering a user into the app */

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, username } = req.body;
    /* Hashing the password */
    const checkUserNameValidity = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    if (checkUserNameValidity) {
      return res.status(401).json({
        message: "Username is not available",
      });
    }
    const checkUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (checkUser) {
      return res.status(401).json({
        message: "User Already Exists with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await prisma.users.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });

    // Generating the Access Token
    const accessToken = jwt.sign(
      {
        id: userData!.id,
        email: userData!.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30m",
      }
    );
    // Generating the Refresh Token
    const refreshToken = jwt.sign(
      {
        email: userData!.email,
        id: userData!.id,
      },
      process.env.REFRESH_JWT_SECRET!
    );

    //store JWT in cookie
    const token = `${accessToken} ${refreshToken}`;
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: parseInt(process.env.COOKIE_EXPIRATION_TIME!, 10),
        path: "/", //cookie valid for whole site
      })
    );
    return res.json(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Some Error Occured in backend" });
  }
};

/* Controller for Login of a user */

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userData = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (!userData) {
      return res.status(401).json({ message: "Credintials does not match" });
    }
    const matchPassword = await bcrypt.compare(password, userData.password!);
    if (!matchPassword) {
      return res.status(401).json({ message: "Credintials does not match" });
    }

    // Generating the Access Token
    const accessToken = jwt.sign(
      {
        id: userData!.id,
        email: userData!.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30m",
      }
    );
    // Generating the Refresh Token
    const refreshToken = jwt.sign(
      {
        email: userData!.email,
        id: userData!.id,
      },
      process.env.REFRESH_JWT_SECRET!
    );

    //store JWT in cookie
    const token = `${accessToken} ${refreshToken}`;
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: parseInt(process.env.COOKIE_EXPIRATION_TIME!, 10),
        path: "/", //cookie valid for whole site
      })
    );
    const userData1 = await prisma.users.findUnique({
      where: {
        id: userData!.id,
      },
      select: {
        id: true,
        profile_urn: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        username: true,
      },
    });
    return res.json(userData1);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Some Error Occured in backend" });
  }
};

/*Controller fo Logout the User */

export const logOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    return res.status(200).json({ logOut: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checker = async (req: Request, res: Response) => {
  try {
    const { email } = res.locals.user;
    return res.json({ message: email });
  } catch (error) {
    return res.status(500).json({ message: "Some Error Occured" });
  }
};
