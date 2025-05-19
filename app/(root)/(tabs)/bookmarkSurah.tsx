import BookedItem from "@/components/BookedItem";
import { surah } from "@/types/type";
import { RootState } from "@/utils/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

const bookmarkSurah = () => {
    const { surah } = useSelector((state: RootState) => state.bookmark);
    const [loading, setLoading] = useState(true);
    const [surahData, setSurahData] = useState<surah[]>([]);

    useEffect(() => {
      const fetchLastReadSurahs = async () => {
        setLoading(true); 

        try {
          const response = await axios.post(
          `${API_URL}/lastread`,
            surah,
            {
              headers: {
                "Content-Type": "application/json",
              Authorization: " Bearer " + JWT_TOKEN,
              },
            }
          );
          setSurahData(response.data.data); // Assuming `data.data` is the correct response
        } catch (err) {
          console.error("Error fetching last read surahs:", err);
        } finally {
          setLoading(false); 
        }
      };

      // Fetch data only if `lastRead` has elements
      if (surah.length > 0) {
        fetchLastReadSurahs();
      }else{
        setLoading(false); 
      }
    }, [surah]);

    return (
        <BookedItem loading={loading} surahData={surahData}/>
    );
};

export default bookmarkSurah;