import { createClient } from 'pexels';
import prisma from '../../index';

import { BrProvider, EuroProvider, CreateProducts } from '../interfaces';
import { BrazilianProvider } from './BrProviderMock';
import { EuropeanProvider } from './EuroProviderMock';

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
      ? `!!! Product already exists: ${product} !!!`
      : (prisma.product.create({ data: product, }));
  });
}

const pexelsClient = createClient(process.env.PEXELS_API_KEY as string);

export async function generateImagesPath(category: string) {
  const query = `${category} object`;
  const per_page = 50;

  const images = await pexelsClient.photos.search({ query, per_page });

  if ('error' in images) {
    console.log('Pexels Error: ', images.error);
    throw new Error(images.error);
  }

  console.log('\n-> Generating images path for: ', query, images.photos.length, '...\n');

  return images.photos.map((image) => image.src.medium);
}
