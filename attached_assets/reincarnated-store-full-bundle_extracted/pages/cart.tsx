import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 font-mono max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.id} className="border-b border-gray-700 pb-4">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-blue-400">{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
