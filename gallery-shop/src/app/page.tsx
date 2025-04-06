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
      <div className="min-h-screen p-4 bg-gray-100">
        <SearchBar onSearch={fetchImages} />
        {loading ? <p className="mt-4">Cargando...</p> : <ImageGrid images={images} />}
        <CartSidebar />
      </div>
    </CartProvider>
  );
}
