'use client';
import { useState, useEffect } from 'react';
import { useDebounceSearch } from '../hooks/useDebounceSearch';
import { Search } from 'lucide-react';

type Props = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: Props) {
  const [input, setInput] = useState('');
  const debounced = useDebounceSearch(input, 500);

  useEffect(() => {
    if (debounced.trim()) {
      onSearch(debounced);
    }
  }, [debounced]);

  return (
    <div className="w-full my-4">
      <div className="relative w-full max-w-6xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className="w-full pl-10 pr-4 py-2 text-lg bg-white border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          type="text"
          placeholder="Buscar imágenes..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
}
