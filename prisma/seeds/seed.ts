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

  console.log({ boleto, debito, credito });
}

async function seedCategories() {
  const categoriesData = await generateCategoriesData();
  await Promise.all(categoriesData);
}

async function seedProducts() {
  const productsData = await generateProductsData();
  await Promise.all(productsData);
}

async function seedAll() {
  await seedPayMethods();
  await seedCategories();
  await seedProducts();
}

seedAll()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
