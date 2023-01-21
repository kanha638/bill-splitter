-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "Disabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userID_key" ON "Users"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
