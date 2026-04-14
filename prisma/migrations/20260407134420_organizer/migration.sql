-- CreateTable
CREATE TABLE "Organizer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "picture" TEXT,
    "telegram" TEXT,
    "companyName" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "url" TEXT,
    "companyX" TEXT,
    "entityName" TEXT,
    "industry" TEXT,
    "bio" TEXT,
    "souceOFfund" TEXT,
    "logo" TEXT,
    "password" TEXT NOT NULL,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationCode" INTEGER NOT NULL,
    "emailVerificationCodeExpires" TIMESTAMP(3) NOT NULL,
    "resetPasswordOtp" INTEGER NOT NULL,
    "resetPasswordExpires" TIMESTAMP(3) NOT NULL,
    "resetPasswordRequest" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_userName_key" ON "Organizer"("userName");
