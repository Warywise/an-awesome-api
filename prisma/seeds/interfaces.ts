export interface CreateCategories {
  name: string;
}

export interface CreateProducts {
  name: string;
  description: string;
  image: string[];
  price: number;
  categoryId: number;
  material: string;
  hasDiscount?: boolean;
  discountValue?: number;
}

export interface InsertType {
  where: { name: string },
  update: Record<string, never>,
  create: CreateCategories | CreateProducts,
}
