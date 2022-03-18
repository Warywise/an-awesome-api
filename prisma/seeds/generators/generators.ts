import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { BrProvider, EuroProvider, CreateProducts } from '../interfaces';
import { BrazilianProvider } from './BrProvider';
import { EuropeanProvider } from './EuroProvider';

const BrProviderPromise: Promise<BrProvider[]> = new Promise((resolve) => setTimeout(
  resolve, 300, BrazilianProvider
));

const EuroProviderPromise: Promise<EuroProvider[]> = new Promise((resolve) => setTimeout(
  resolve, 300, EuropeanProvider
));

async function getCategories(): Promise<string[]> {
  const categories: string[] = [];

  await BrProviderPromise.then((data) => data
    .forEach(({ categoria }) => {
      if (!categories.includes(categoria)) categories.push(categoria);
    }));

  await EuroProviderPromise.then((data) => data
    .forEach(({ details: { adjective } }) => {
      if (!categories.includes(adjective)) categories.push(adjective);
    }));

  return categories;
}

export async function generateCategoriesData() {
  const categoriesData = await getCategories();
  return categoriesData.map(async (name) => (
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name }
    })
  ));
}

async function getProducts() {
  const products: CreateProducts[] = [];
  const categories = await getCategories();

  await BrProviderPromise.then((data) => data
    .forEach((product) => products.push(
      {
        name: product.nome,
        description: product.descricao,
        image: [product.imagem],
        price: Number(product.preco),
        categoryId: categories.findIndex((name) => name === product.categoria) + 1,
        material: product.material,
        provider: 'Brazilian Provider',
      }
    )
    ));

  await EuroProviderPromise.then((data) => data
    .forEach((product) => products.push(
      {
        name: product.name,
        description: product.description,
        image: product.gallery,
        price: Number(product.price),
        categoryId: categories.findIndex((name) => name === product.details.adjective) + 1,
        material: product.details.material,
        provider: 'European Provider',
        hasDiscount: product.hasDiscount,
        discountValue: Number(product.discountValue),
      }
    )
    ));

  return products;
}

export async function generateProductsData() {
  const productsData = await getProducts();

  return productsData.map(async (product) => {
    const productExists = await prisma.product.findFirst({
      where: {
        name: product.name,
        categoryId: product.categoryId,
        material: product.material,
        provider: product.provider,
      }
    });

    return productExists
      ? console.log(`Product already exists: ${product}`)
      : (prisma.product.create({ data: product, }));
  });
}
