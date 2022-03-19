import { PrismaClient } from '@prisma/client';
import StatusCode from '../utils/enumStatusCodes';

class ProductService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllProducts() {
    return await this.prisma.product.findMany();
  }

  async getProductById(id: number) {
    if (isNaN(id)) return {
      code: StatusCode.BAD_REQUEST,
      error: 'Field "Id" must be a number'
    };

    const product = await this.prisma.product.findUnique({
      where: { id }
    });

    return product ?? {
      code: StatusCode.NOT_FOUND,
      error: 'Product not found'
    };
  }

  async getProductsByCategory(categoryName: string) {
    if (typeof categoryName !== 'string') return {
      code: StatusCode.BAD_REQUEST,
      error: 'Field "Category Name" must be a string'
    };

    const products = await this.prisma.category.findFirst({
      where: {
        name: {
          contains: categoryName,
          mode: 'insensitive',
      } },
      select: {
        products: {
          include: {
            category: {
              select: {
                name: true,
              }
            }
          }
        },
      }
    });

    return products?.products ?? {
      code: StatusCode.NOT_FOUND,
      error: 'Product\'s category not found'
    };
  }

  async getProductsByQuery(query: string) {
    if (typeof query !== 'string') return {
      code: StatusCode.BAD_REQUEST,
      error: 'Field "Query" must be a string'
    };

    if (query.length < 1) return {
      code: StatusCode.BAD_REQUEST,
      error: 'Query must be at least one letter long'
    };

    const products = await this.prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      }
    });

    return products ?? {
      code: StatusCode.NOT_FOUND,
      error: 'Product name not found'
    };
  }
}

export default new ProductService();
