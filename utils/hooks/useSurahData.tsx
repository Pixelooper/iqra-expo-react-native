import { surah } from '@/types/type';
import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

export const useSurahData = (id: string) => {
  const [data, setData] = useState<surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/ayat/${id}`, {
            headers: {
                Authorization: " Bearer " + JWT_TOKEN,
            }
        });
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