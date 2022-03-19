import { PrismaClient } from '@prisma/client';
import StatusCode from '../utils/enumStatusCodes';

export default class ProductService {
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

  async getProductsByCategory(name: string) {
    if (typeof name !== 'string') return {
      code: StatusCode.BAD_REQUEST,
      error: 'Field "Category Name" must be a string'
    };

    const products = await this.prisma.category.findFirst({
      where: {
        name: {
          contains: name,
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
}
