-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileImg" TEXT,
    "isEmailVerified" BOOLEAN DEFAULT false,
    "emailVerificationCode" INTEGER,
    "emailVerificationCodeExpires" TIMESTAMP(3),
    "resetPasswordOtp" INTEGER,
    "resetPasswordExpires" TIMESTAMP(3),
    "resetPasswordRequest" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
