import { PrismaClient } from '@prisma/client';

export default abstract class ProductService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  protected async getAllProducts() {
    return this.prisma.product.findMany();
  }
}
