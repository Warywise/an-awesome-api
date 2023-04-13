import { generateImagesPath } from './generators';
import prisma from '../index';

const categories = [
  "Fantastic", "Incredible", "Awesome", "Tasty", "Handcrafted", "Rustic", "Practical", "Sleek",
  "Ergonomic",
  "Intelligent", "Gorgeous", "Small",
  "Unbranded",
  "Licensed", "Handmade", "Refined",
  "Generic",
];

const getRandomInd = (min=0, max=49) => Math.floor(
  Math.random() * (max - min + 1) + min);

async function main() {
  console.log('\n-> Initializing img paths update...\n');
  prisma.$connect();

  const newProductsImg = (await Promise.all(categories.map(async (category) => {
    const imgPaths = await generateImagesPath(category);

    const products = await prisma.product.findMany({
      where: { category: { name: category } },
      select: { id: true, provider: true }
    });

    return products.map(({ id, provider }) => {
      const newImages: string[] = [];

      if (provider === 'European Provider') {
        const length = getRandomInd(2, 4);
        for (let i = 0; i < length; i++) {
          newImages.push(imgPaths[getRandomInd()]);
        }
      } else {
        newImages.push(imgPaths[getRandomInd()]);
      }

      return { id, image: newImages };
    });
  }))).flat();

  console.log('\nTotal Products: ', newProductsImg.length, '...\n');

  return await Promise.all(newProductsImg.map(({ id, image }) =>
    prisma.product.update({
      where: { id },
      data: { image: { set: image } }
    }))
  );
}

main().catch(console.log).finally(() => prisma.$disconnect());
