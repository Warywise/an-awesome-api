import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { BrProvider, EuroProvider } from "../interfaces";
import { BrazilianProvider } from "./BrProvider";
import { EuropeanProvider } from "./EuroProvider";

const BrProviderPromise: Promise<BrProvider[]> = new Promise((resolve) => setTimeout(
  resolve, 300, BrazilianProvider
));

const EuroProviderPromise: Promise<EuroProvider[]> = new Promise((resolve) => setTimeout(
  resolve, 300, EuropeanProvider
));

async function getCategories(): Promise<string[]> {
  const categories: string[] = [];

  await BrProviderPromise.then((data) => data
    .forEach(({ categoria }) => !categories.includes(categoria) ?? categories.push(categoria)));

    await EuroProviderPromise.then((data) => data
      .forEach(({ details: { adjective } }) => !categories
        .includes(adjective) ?? categories.push(adjective)));

  return categories;
}

export async function generateCategoriesData() {
  const categoriesData = await getCategories();
  return categoriesData.map((name) => (
    prisma.category.upsert({
      where: { name },
      update: {},
      create: { name }
    })
  ));
}
