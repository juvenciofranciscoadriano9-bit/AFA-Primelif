import { useEffect, useState } from 'react';

/**
 * Estado persistido no localStorage.
 * Mantém a API simples: const [value, setValue] = useLocalStorage(key, initialValue)
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored === null ? initialValue : JSON.parse(stored);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Se o armazenamento estiver indisponível, a aplicação continua a funcionar em memória.
    }
  }, [key, value]);

  return [value, setValue];
}
