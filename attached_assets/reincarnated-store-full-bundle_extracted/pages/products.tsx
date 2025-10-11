import Link from 'next/link';

type Product = {
  id: string;
  name: string;
  slug: string;
  price: string;
  image: string;
};

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Milabs Hoodie',
    slug: 'milabs-hoodie',
    price: '$50',
    image: '/images/products/milabs-hoodie-front.jpg',
  },
  {
    id: '2',
    name: 'Behold A Pale Horse Tee',
    slug: 'behold-a-pale-horse-tee',
    price: '$35',
    image: '/images/products/behold-pale-horse-front.jpg',
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 tracking-wide">🔥 All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="bg-zinc-900 border border-gray-700 rounded-lg p-4 hover:bg-zinc-800 transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-blue-400 mt-2">{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
