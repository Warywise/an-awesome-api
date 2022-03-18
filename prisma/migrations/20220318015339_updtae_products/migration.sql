/*
  Warnings:

  - Added the required column `provider` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "provider" VARCHAR(65) NOT NULL;
