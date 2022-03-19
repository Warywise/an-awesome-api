import { PrismaClient } from '@prisma/client';

export default class CategoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllCategories() {
    return await this.prisma.category.findMany();
  }
}
