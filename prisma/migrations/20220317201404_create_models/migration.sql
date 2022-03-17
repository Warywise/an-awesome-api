-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(125) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "image" TEXT[],
    "price" DECIMAL(65,30) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "material" VARCHAR(65) NOT NULL,
    "hasDiscount" BOOLEAN,
    "discountValue" DECIMAL(65,30),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(125) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(125) NOT NULL,
    "name" VARCHAR(125) NOT NULL,
    "lastName" VARCHAR(125) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(11),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAdress" (
    "userId" INTEGER NOT NULL,
    "adress" VARCHAR(125) NOT NULL,
    "district" VARCHAR(65) NOT NULL,
    "city" VARCHAR(125) NOT NULL,
    "state" VARCHAR(65) NOT NULL,

    CONSTRAINT "UserAdress_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserCard" (
    "userId" INTEGER NOT NULL,
    "cardNumber" VARCHAR(16) NOT NULL,
    "cardName" VARCHAR(125) NOT NULL,
    "cardValidity" VARCHAR(4) NOT NULL,

    CONSTRAINT "UserCard_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "payMethodId" INTEGER NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayMethod" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(125),

    CONSTRAINT "PayMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSold" (
    "saleId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ProductSold_pkey" PRIMARY KEY ("saleId","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PayMethod_name_key" ON "PayMethod"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAdress" ADD CONSTRAINT "UserAdress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCard" ADD CONSTRAINT "UserCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_payMethodId_fkey" FOREIGN KEY ("payMethodId") REFERENCES "PayMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSold" ADD CONSTRAINT "ProductSold_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSold" ADD CONSTRAINT "ProductSold_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
