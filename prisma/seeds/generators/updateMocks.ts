import { generateImagesPath } from ".";
import { BrazilianProvider } from "./BrProviderMock";
import { EuropeanProvider } from "./EuroProviderMock";

type brType = typeof BrazilianProvider;
type euroType = typeof EuropeanProvider;

const getCategories = (provider: string) => {
  const categories: string[] = [];

  if (provider === 'BR') {
    BrazilianProvider.forEach(({ categoria }) => {
      if (!categories.includes(categoria)) categories.push(categoria);
    });
  }

  if (provider === 'EURO') {
    EuropeanProvider.forEach(({ details: { adjective } }) => {
      if (!categories.includes(adjective)) categories.push(adjective);
    });
  }

  return categories;
};

const main = async (provider: string) => {
  const categories = getCategories(provider);
  const mock = provider === 'BR' ? BrazilianProvider : EuropeanProvider;

  await Promise.all(categories.map(async (category) => {
    const products: brType & euroType = [];

    if (provider === 'BR') {
      (mock as brType).forEach((product) => {
        if (product.categoria === category) products.push(product);
      });
    }

    if (provider === 'EURO') {
      (mock as euroType).forEach((product) => {
        if (product.details.adjective === category) products.push(product);
      });
    }

    const imagePaths = await generateImagesPath(category);

    products.forEach((product) => {
      const mockProductIndex = mock.findIndex((mockProduct) => mockProduct.id === product.id);

      if (provider === 'BR') {
        const randomImg = imagePaths[Math.floor(Math.random() * imagePaths.length)];
        (mock as brType)[mockProductIndex].imagem = randomImg;
      }

      if (provider === 'EURO') {
        (mock as euroType)[mockProductIndex].gallery = (mock as euroType)[mockProductIndex].gallery.map(() => {
          const randomImg = imagePaths[Math.floor(Math.random() * imagePaths.length)];
          return randomImg;
        });
      }
    });
  }));

  return mock;
};

main('EURO') // adicionar 'BR' ou 'EURO'
  .catch(console.log).then((data) => console.log(data));
