'use client';
import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounceSearch'

type Props = {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: Props) {
  const [input, setInput] = useState('')
  const debounced = useDebounce(input, 500)

  useEffect(() => {
    if (debounced.trim()) {
      onSearch(debounced)
    }
  }, [debounced])

  return (
    <input
      className="w-full max-w-md px-4 py-2 border rounded shadow focus:outline-none focus:ring"
      type="text"
      placeholder="Buscar imágenes..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  )
}
