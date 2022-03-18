import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { generateCategoriesData, generateProductsData } from './generators/generators';

async function seedPayMethods() {
  const boleto = await prisma.payMethod.upsert({
    where: { name: 'boleto' },
    update: {},
    create: { name: 'boleto' }
  });

  const debito = await prisma.payMethod.upsert({
    where: { name: 'debito' },
    update: {},
    create: { name: 'debito' }
  });

  const credito = await prisma.payMethod.upsert({
    where: { name: 'credito' },
    update: {},
    create: { name: 'credito' }
  });

  boleto; debito; credito; /* lint warning */
  // console.log({ boleto, debito, credito }); /* descomente caso queira acompanhar o seed */
}

async function seedCategories() {
  const categoriesData = await generateCategoriesData();
  const seedCategoriesResult = await Promise.all(categoriesData);

  seedCategoriesResult; /* lint warning */
  // console.log(seedCategoriesResult); /* descomente caso queira acompanhar o seed */
}

async function seedProducts() {
  const productsData = await generateProductsData();
  const seedProductsResult = await Promise.all(productsData);

  seedProductsResult; /* lint warning */
  // console.log(seedProductsResult); /* descomente caso queira acompanhar o seed */
}

async function seedAll() {
  await seedPayMethods();
  await seedCategories();
  await seedProducts();
}

seedAll()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
