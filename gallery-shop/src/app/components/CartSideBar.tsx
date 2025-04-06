import { useCart } from '../context/CartContext';

export const CartSidebar = () => {
  const { cart, removeFromCart, total } = useCart();

  return (
    <div className="w-full md:w-1/3 bg-white shadow p-4">
      <h2 className="text-xl font-bold mb-4">Carrito</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <p>{item.title}</p>
          <p>${item.price.toFixed(2)}</p>
          <button onClick={() => removeFromCart(item.id)} className="text-red-500">
            Eliminar
          </button>
        </div>
      ))}
      <hr className="my-2" />
      <p className="font-bold">Total: ${total.toFixed(2)}</p>
    </div>
  );
};
