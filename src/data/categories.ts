import { CategoryName } from '../types';

export interface CategoryItem {
  id: string;
  name: CategoryName;
  slug: string;
  itemCount: number;
  iconName: string;
  image: string;
  description: string;
  featured?: boolean;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics',
    itemCount: 142,
    iconName: 'Tv',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description: 'Audio, cameras, accessories & smart gear',
    featured: true,
  },
  {
    id: 'cat-2',
    name: 'Phones',
    slug: 'phones',
    itemCount: 88,
    iconName: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    description: 'Flagship smartphones, budget phones & accessories',
    featured: true,
  },
  {
    id: 'cat-3',
    name: 'Computers',
    slug: 'computers',
    itemCount: 96,
    iconName: 'Laptop',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
    description: 'Laptops, desktops, monitors & PC components',
    featured: true,
  },
  {
    id: 'cat-4',
    name: 'Gaming',
    slug: 'gaming',
    itemCount: 75,
    iconName: 'Gamepad2',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    description: 'Consoles, controllers, VR headsets & gaming laptops',
    featured: true,
  },
  {
    id: 'cat-5',
    name: 'Fashion',
    slug: 'fashion',
    itemCount: 230,
    iconName: 'Shirt',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80',
    description: 'Men & women trending apparel, jackets & wear',
    featured: true,
  },
  {
    id: 'cat-6',
    name: 'Shoes',
    slug: 'shoes',
    itemCount: 110,
    iconName: 'Footprints',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    description: 'Sneakers, running shoes, formal & boots',
    featured: true,
  },
  {
    id: 'cat-7',
    name: 'Beauty',
    slug: 'beauty',
    itemCount: 64,
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    description: 'Skincare, perfumes, makeup & grooming products',
    featured: false,
  },
  {
    id: 'cat-8',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    itemCount: 180,
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    description: 'Cookware, coffee makers, decor & furniture',
    featured: false,
  },
  {
    id: 'cat-9',
    name: 'Sports',
    slug: 'sports',
    itemCount: 52,
    iconName: 'Dumbbell',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    description: 'Fitness gear, outdoor equipment & athletic wear',
    featured: false,
  },
  {
    id: 'cat-10',
    name: 'Groceries',
    slug: 'groceries',
    itemCount: 210,
    iconName: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    description: 'Fresh produce, beverages, snacks & daily essentials',
    featured: false,
  },
];
