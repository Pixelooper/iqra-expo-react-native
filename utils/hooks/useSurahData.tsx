import { surah } from '@/types/type';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const useSurahData = (id: string) => {
  const [data, setData] = useState<surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://iqra-backend-git-master-iftikharrashas-projects.vercel.app/api/iqra/expo/ayat/${id}`
        );
        setData(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to load surah data');
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      setData(null);
      setLoading(true);
    };
  }, [id]);

  return { data, loading, error };
};