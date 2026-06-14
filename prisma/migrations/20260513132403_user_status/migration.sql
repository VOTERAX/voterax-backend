-- CreateEnum
CREATE TYPE "OrganizerAccountStatus" AS ENUM ('APPROVED', 'PENDING', 'SUSPENDED', 'REJECTED');

-- CreateEnum
CREATE TYPE "UserAccountStatus" AS ENUM ('ACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "Organizer" ADD COLUMN     "status" "OrganizerAccountStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserAccountStatus" NOT NULL DEFAULT 'ACTIVE';
