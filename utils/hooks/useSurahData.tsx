import { surah } from '@/types/type';
import axios from 'axios';
import { useState, useEffect } from 'react';
import useNetworkStatus from './useNetworkStatus';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

export const useSurahData = (id: string) => {
  const [data, setData] = useState<surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isConnected, setIsConnected, checkNetworkStatus } = useNetworkStatus();
  
  const fetchData = async () => {
    setLoading(true);
    try {
        const connected = await checkNetworkStatus();
        if (!connected) {
            console.log("No internet connection.");
            setIsConnected(false);
            setData(null);
            return;
        }
        setIsConnected(true);
        
        const response = await axios.get(`${API_URL}/ayat/${id}`, {
            headers: {
                Authorization: " Bearer " + JWT_TOKEN,
            }
        });
        setData(response.data.data);
        setError(null);
      } catch (error) {
          console.error("Error fetching data", error);
      } finally {
          setLoading(false);
      }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

  return { isConnected, data, loading, error, refetch: fetchData };
};