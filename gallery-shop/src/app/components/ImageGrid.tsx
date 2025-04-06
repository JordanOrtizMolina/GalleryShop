import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

interface ImageType {
  id: string;
  url: string;
  title: string;
  price: number;
}

export const ImageGrid = ({ images }: { images: ImageType[] }) => {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {images.map((img) => (
        <motion.div
          key={img.id}
          whileHover={{ scale: 1.02 }}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-md transition-all"
        >
          <div className="relative w-full h-[200px]">
            <Image
              src={img.url}
              alt={img.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          <div className="p-4 flex flex-col justify-between h-[160px]">
            <h3 className="font-semibold text-lg mb-2 truncate">{img.title}</h3>

            <div className="flex justify-between items-center mt-auto">
              <p className="text-xl font-bold text-green-600">
                ${img.price.toFixed(2)}
              </p>
              <button
                onClick={() => addToCart(img)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm shadow"
              >
                <ShoppingCart className="w-4 h-4" />
                Comprar
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
