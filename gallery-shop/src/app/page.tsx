'use client';

import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { SearchBar } from './components/SearchBar';
import { ImageGrid } from './components/ImageGrid';
import { CartSidebar } from './components/CartSideBar';

interface ImageType {
  id: string;
  url: string;
  title: string;
  price: number;
}

export default function Home() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=_fXgRK1teruSbVD--MtapHmEeNKPyvu-j9_QBNwFT9o`
      );

      if (!response.ok) {
        throw new Error('Error al obtener imágenes');
      }

      const data = await response.json();

      const formattedImages = data.results.map((img: any) => ({
        id: img.id,
        url: img.urls.regular,
        title: img.alt_description || 'Sin título',
        price: Number((Math.random() * 20 + 5).toFixed(2)),
      }));

      setImages(formattedImages);
    } catch (error) {
      console.error('Error al buscar imágenes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br bg-blue-100 text-gray-800">
        <header className="py-0 px-0 bg-gradient-to-br bg-blue-100 border-b border-gray-200 shadow sticky top-0 z-50">
          <div className="max-w-6xl mx-8 flex items-center gap-30">
            <h1 className="text-3xl text-black whitespace-nowrap">🛍️ Gallery Shop    </h1>
            <div className="flex-1 max-w-xl">
              <SearchBar onSearch={fetchImages} />
            </div>
          </div>
        </header>
        <div className="flex flex-col md:flex-row">
          <main className="flex-1 p-6 max-w-6xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {Array(6)
                  .fill(null)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="h-72 bg-blue-100 animate-pulse rounded-xl shadow-inner"
                    />
                  ))}
              </div>
            ) : (
              <ImageGrid images={images} />
            )}
          </main>
  
          <aside className="w-full md:w-[350px] border-l border-gray-200 bg-blue-100 shadow-inner p-6 sticky top-0 h-screen overflow-y-auto">
            <CartSidebar />
          </aside>
        </div>
      </div>
    </CartProvider>
  );
}  