export interface CartProps {
  className?: string;
}

export interface CartItemProps {
  item: {
    id: string;
    title: string;
    quantity: number;
    total: number;
    price: number;
    image: string;
  };
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export interface ProductCardProps {
  product: Product;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image: string;
}
export interface Item {
  id: string;
  price: number;
  image: string;
  description: string;
  title: string;
}
export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  total: number;
  selectedItem: Item;
}
