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
  provider: string
}

export interface InsertType {
  where: { name: string },
  update: Record<string, never>,
  create: CreateCategories | CreateProducts,
}

export interface BrProvider {
  nome: string;
  descricao: string;
  categoria: string;
  imagem: string;
  preco: string;
  material: string;
  departamento: string;
  id: string;
}

export interface EuroProvider {
  hasDiscount: boolean;
  name: string;
  gallery: string[];
  description: string;
  price: string;
  discountValue: string;
  details: {
    adjective: string;
    material: string;
  }
  id: string;
}
