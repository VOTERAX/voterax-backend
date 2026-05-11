-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerificationCode" INTEGER,
ADD COLUMN     "emailVerificationCodeExpires" TIMESTAMP(3),
ADD COLUMN     "isEmailVerified" BOOLEAN DEFAULT false,
ADD COLUMN     "resetPasswordExpires" TIMESTAMP(3),
ADD COLUMN     "resetPasswordOtp" INTEGER,
ADD COLUMN     "resetPasswordRequest" BOOLEAN DEFAULT false;
