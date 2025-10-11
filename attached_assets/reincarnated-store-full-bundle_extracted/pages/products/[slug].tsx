import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string;
};

const mockProducts: Product[] = [
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

export default function ProductDetailPage() {
  const { query } = useRouter();
  const [product, setProduct] = useState<Product | undefined>();

  useEffect(() => {
    if (query.slug) {
      const found = mockProducts.find((p) => p.slug === query.slug);
      setProduct(found);
    }
  }, [query.slug]);

  if (!product) {
    return (
      <div className="text-center text-white py-20 font-mono">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 font-mono max-w-4xl mx-auto">
      <img src={product.image} alt={product.name} className="w-full h-auto rounded mb-6" />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-blue-400 text-xl mb-4">{product.price}</p>
      <p className="mb-6">{product.description}</p>
      <button className="bg-blue-600 hover:bg-blue-800 px-6 py-3 rounded font-semibold">
        🛒 Add to Cart
      </button>
    </div>
  );
}
