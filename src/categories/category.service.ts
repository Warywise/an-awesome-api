import { PrismaClient } from '@prisma/client';

class CategoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllCategories() {
    return await this.prisma.category.findMany();
  }
}

export default new CategoryService();
