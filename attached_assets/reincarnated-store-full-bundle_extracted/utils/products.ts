export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string;
};

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Milabs Hoodie',
    slug: 'milabs-hoodie',
    description: 'Inspired by the underground truths of MILABS.',
    price: '$50',
    image: '/images/products/milabs-hoodie-front.jpg',
  },
  {
    id: '2',
    name: 'Behold A Pale Horse Tee',
    slug: 'behold-a-pale-horse-tee',
    description: 'Tribute to Milton William Cooper’s iconic work.',
    price: '$35',
    image: '/images/products/behold-pale-horse-front.jpg',
  },
];
