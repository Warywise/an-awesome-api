import { PrismaClient as PrismaClientType } from '@prisma/client';
import PrismaClient from '../../../prisma';
import StatusCode from '../../utils/enumStatusCodes';

class ProductService {
  private readonly prisma: PrismaClientType;

  constructor() {
    this.prisma = PrismaClient;
  }

  async getAllProducts() {
    return await this.prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          }
        }
      }
    });
  }

  async getProductById(idi: number) {
    // if (isNaN(idi)) return {
    //   code: StatusCode.BAD_REQUEST,
    //   error: 'Field "Id" must be a number'
    // };

    const product = await this.prisma.product.findUnique({
      where: { id: idi }
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
        }
      },
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
