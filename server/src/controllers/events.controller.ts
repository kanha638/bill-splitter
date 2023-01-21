import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, desc, invitedUsers } = req.body;

    const newEvent = await prisma.event.create({
      data: {
        createrID: res.locals.user.id,
        desc: desc,
        name: name,
        invitedUsers: invitedUsers,
        active_users: res.locals.user.id,
        createdAt: new Date(),
      },
    });

    invitedUsers.forEach(async (user: any) => {
      try {
        const message = `${res.locals.user.firstName} has invited you to join the ${newEvent.name}`;
        const token = jwt.sign(
          {
            eventID: newEvent!.id,
            invitedUser: user,
          },
          process.env.EVENT_JWT_SECRET!
        );
        const current_time1: any = Date.now();
        await prisma.invitations.create({
          data: {
            message: message,
            eventID: newEvent!.id,
            userID: user,
            token: token,
            createdAt: new Date(),
          },
        });
      } catch (error) {
        console.log(error);
      }
    });
    return res.json(newEvent);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Some Error Occured in backend" });
  }
};

export const acceptInvite = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ message: "Invalid Request" });
    }
    jwt.verify(
      token,
      process.env.EVENT_JWT_SECRET!,
      async (err: any, value: any) => {
        if (err) {
          return res.status(500).json({ message: "Some Error Occured " });
        } else {
          if (value.invitedUser !== res.locals.user.id) {
            return res.status(401).json({ message: "Unauthenticated" });
          }
          const invitation = await prisma.invitations.findFirst({
            where: {
              AND: [
                { userID: value.invitedUser },
                {
                  eventID: value.eventID,
                },
              ],
            },
          });

          if (!invitation) {
            return res.status(404).json({
              message: "Invalid Invitation/Invitation Already accepted",
            });
          }
          const eventDetails = await prisma.event.findUnique({
            where: {
              id: value.eventID,
            },
            select: {
              invitedUsers: true,
            },
          });
          const invitedUsersPrev = eventDetails!.invitedUsers;
          await prisma.event.update({
            where: {
              id: value.eventID,
            },
            data: {
              invitedUsers: {
                set: invitedUsersPrev.filter((id) => id !== value.invitedUser),
              },
              active_users: {
                push: value.invitedUser,
              },
            },
          });
          await prisma.invitations.delete({
            where: {
              id: invitation!.id,
            },
          });
          return res.json({ message: "Invitation Accepted" });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Some Error Occured in backend" });
  }
};

export const getInvitationsForUser = async (req: Request, res: Response) => {
  try {
    const userID = res.locals.user.id;
    const invitations = await prisma.invitations.findMany({
      where: {
        userID: userID,
      },
    });
    return res.json(invitations);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Some Error Occured in backend" });
  }
};

export const getAllMyEvents = async (req: Request, res: Response) => {
  try {
    const userID = res.locals.user.id;
    const Events = await prisma.event.findMany({
      where: {
        active_users: {
          has: userID,
        },
      },
    });
    return res.json(Events);
  } catch (error) {}
};
