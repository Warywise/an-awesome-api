import { PrismaClient as PrismaClientType, Prisma, Product } from '@prisma/client';
import PrismaClient from '../../../prisma';
import StatusCode from '../../utils/enumStatusCodes';
import { Request } from 'express';
import QueryString from 'qs';

class ProductService {
  private readonly prisma: PrismaClientType;

  constructor() {
    this.prisma = PrismaClient;
  }

  async getProducts(request: Request) {
    const { name, category, hasDiscount, ...rest } = request.query as { [key: string]: string };

    const where = {} as Prisma.ProductWhereInput;
    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }
    if (category) {
      where.category = {
        name: {
          contains: category,
          mode: 'insensitive',
        }
      };
    }
    if (hasDiscount) {
      where.hasDiscount = true;
    }

    let products: Product[] = [];
    const total = await this.prisma.product.count({ where });

    if (total > 0) {
      products = await this.prisma.product.findMany({
        where,
        include: {
          category: {
            select: {
              name: true,
            }
          }
        },
        ...rest,
      });
    }

    return products.length
      ? { products, total }
      : {
        code: StatusCode.NOT_FOUND,
        error: 'Products not found',
      };
  }

  async getProductById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true
      },
    });

    return product ?? {
      code: StatusCode.NOT_FOUND,
      error: 'Product not found'
    };
  }
}

export default new ProductService();
