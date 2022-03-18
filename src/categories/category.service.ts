import { PrismaClient } from '@prisma/client';

export default abstract class CategoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  protected async getAllCategories() {
    return this.prisma.category.findMany();
  }
}
