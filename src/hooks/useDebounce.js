import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing values
 * @param {any} value - The value to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {any} - The debounced value
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for debounced logo search functionality
 * @param {string} searchTerm - The search term
 * @param {number} delay - The delay in milliseconds (default: 500ms)
 * @returns {object} - Object containing search state and results
 */
export function useLogoSearch(searchTerm, delay = 500) {
  const debouncedSearchTerm = useDebounce(searchTerm, delay);
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setLogos([]);
      setError(null);
      return;
    }

    const searchLogos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { searchLogos } = await import('../services/logoService');
        const results = await searchLogos(debouncedSearchTerm);
        setLogos(results);
      } catch (err) {
        setError(err.message);
        setLogos([]);
      } finally {
        setLoading(false);
      }
    };

    searchLogos();
  }, [debouncedSearchTerm]);

  return {
    logos,
    loading,
    error,
    searchTerm: debouncedSearchTerm
  };
}
