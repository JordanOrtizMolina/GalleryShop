import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

export const CartSidebar = () => {
  const { cart, removeFromCart, total } = useCart();

  return (
    <div>
      <h2 className="text-xl font-bold text-black mb-4">🛒 Tu carrito</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-blue-50 border border-gray-200 rounded-lg p-3 shadow-sm"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          <hr className="border-gray-300" />

          <div className="text-lg font-semibold flex justify-between">
            <span>Total:</span>
            <span className="text-green-600">${total.toFixed(2)}</span>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md transition text-center">
            Proceder al pago
          </button>
        </div>
      )}
    </div>
  );
};
