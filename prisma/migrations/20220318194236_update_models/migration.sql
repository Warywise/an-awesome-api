/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PayMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductSold` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAdress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSold" DROP CONSTRAINT "ProductSold_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductSold" DROP CONSTRAINT "ProductSold_saleId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_payMethodId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserAdress" DROP CONSTRAINT "UserAdress_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserCard" DROP CONSTRAINT "UserCard_userId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "PayMethod";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductSold";

-- DropTable
DROP TABLE "Sale";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserAdress";

-- DropTable
DROP TABLE "UserCard";

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(125) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "image" TEXT[],
    "price" DECIMAL(65,30) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "material" VARCHAR(65) NOT NULL,
    "hasDiscount" BOOLEAN,
    "discountValue" DECIMAL(65,30),
    "provider" VARCHAR(65) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(125) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(125) NOT NULL,
    "name" VARCHAR(125) NOT NULL,
    "lastName" VARCHAR(125) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(125),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAdresses" (
    "userId" INTEGER NOT NULL,
    "adress" VARCHAR(125) NOT NULL,
    "district" VARCHAR(65) NOT NULL,
    "city" VARCHAR(125) NOT NULL,
    "state" VARCHAR(65) NOT NULL,

    CONSTRAINT "UserAdresses_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserCards" (
    "userId" INTEGER NOT NULL,
    "cardNumber" VARCHAR(16) NOT NULL,
    "cardName" VARCHAR(125) NOT NULL,
    "cardValidity" VARCHAR(4) NOT NULL,
    "cpf" VARCHAR(125) NOT NULL,

    CONSTRAINT "UserCards_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "payMethodId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayMethods" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(125),

    CONSTRAINT "PayMethods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsSold" (
    "saleId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ProductsSold_pkey" PRIMARY KEY ("saleId","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PayMethods_name_key" ON "PayMethods"("name");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAdresses" ADD CONSTRAINT "UserAdresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCards" ADD CONSTRAINT "UserCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_payMethodId_fkey" FOREIGN KEY ("payMethodId") REFERENCES "PayMethods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsSold" ADD CONSTRAINT "ProductsSold_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsSold" ADD CONSTRAINT "ProductsSold_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
