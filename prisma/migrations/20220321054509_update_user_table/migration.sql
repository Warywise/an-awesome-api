-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "token" VARCHAR(125);
