export type Product = {
  id: string;
  name: string;
  description: string;
  img_path: string;
  price: number;
  type: number;
  additions?: string[];
};

export type Restaurant = {
  id: string;
  name: string;
  phone: string;
  img_path: string;
  products: Product[];
  additions: Addition[];
};

export type Addition = {
  id: string;
  description: string;
  price: number;
};

export type Order = {
  restaurant: string;
  reciver: string;
  adress: string;
  observation: string;
  reference: string;
  payment_method: number;
  products: {
    id_product: string;
    additions: string[];
  }[];
};

export type OrderAPI = {
  restaurant: string;
  reciver: string;
  adress: string;
  observation: string;
  reference: string;
  payment_method: number;
  id: string;
  sended: boolean;
  denied: boolean;
  accepted: boolean;
  total: number;
  created_at: string;
  status: string;
};
