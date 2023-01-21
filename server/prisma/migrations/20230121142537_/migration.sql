-- CreateTable
CREATE TABLE "Invitations" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "eventID" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "Invitations_pkey" PRIMARY KEY ("id")
);
