import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageType {
  id: string;
  url: string;
  title: string;
  price: number;
}

export const ImageGrid = ({ images }: { images: ImageType[] }) => {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {images.map((img) => (
        <motion.div key={img.id} whileHover={{ scale: 1.05 }} className="border rounded p-2">
          <Image src={img.url} alt={img.title} width={400} height={300} className="rounded" />
          <h3 className="mt-2 font-bold">{img.title}</h3>
          <p>${img.price.toFixed(2)}</p>
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => addToCart(img)}
          >
            Comprar
          </button>
        </motion.div>
      ))}
    </div>
  );
};
