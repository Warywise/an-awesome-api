import { PrismaClient as PrismaClientType } from '@prisma/client';
import PrismaClient from '../../../prisma';

class CategoryService {
  private prisma: PrismaClientType;

  constructor() {
    this.prisma = PrismaClient;
  }

  async getAllCategories() {
    return await this.prisma.category.findMany();
  }
}

export default new CategoryService();
