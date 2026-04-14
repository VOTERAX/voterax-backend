-- AlterTable
ALTER TABLE "Organizer" ALTER COLUMN "isEmailVerified" DROP NOT NULL,
ALTER COLUMN "emailVerificationCode" DROP NOT NULL,
ALTER COLUMN "emailVerificationCodeExpires" DROP NOT NULL,
ALTER COLUMN "resetPasswordOtp" DROP NOT NULL,
ALTER COLUMN "resetPasswordExpires" DROP NOT NULL,
ALTER COLUMN "resetPasswordRequest" DROP NOT NULL;
