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

const getRandomInd = (min?: number, max?: number) => Math.floor((Math.random() * (max || 50) + 1) + (min || 0));

async function main() {
  console.log('\n-> Initializing img paths update...\n');
  prisma.$connect();

  const newProductsImg = (await Promise.all(categories.map(async (category) => {
    const imgPaths = await generateImagesPath(category);

    const products = await prisma.product.findMany({
      where: { category: { name: category } },
      select: { id: true, image: true, provider: true }
    });

    return products.map(({ id, image, provider }) => {
      const newImages: string[] = [];

      if (image.length) {
        image.forEach((_img) => {
          newImages.push(imgPaths[getRandomInd()]);
        });
      } else if (provider === 'European Provider') {
        const length = getRandomInd(2, 4);
        for (let i = 0; i <= length; i++) {
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

// const await Promise.all(newProductsImg);

// generateImagesPath(category).then((data) => console.log(data));

// prisma.product.updateMany({
//   where: { category: { name: category } },
//   data: { image: { set: [] } }
// }).then((data) => console.log(data));