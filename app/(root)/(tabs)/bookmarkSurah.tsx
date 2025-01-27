import BookedItem from "@/components/BookedItem";
import { surah } from "@/types/type";
import { RootState } from "@/utils/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const bookmarkSurah = () => {
    const { surah } = useSelector((state: RootState) => state.bookmark);
    const [loading, setLoading] = useState(true);
    const [surahData, setSurahData] = useState<surah[]>([]);

    useEffect(() => {
      const fetchLastReadSurahs = async () => {
        setLoading(true); 

        try {
          const response = await axios.post(
            "https://iqra-backend-git-master-iftikharrashas-projects.vercel.app/api/iqra/expo/lastread",
            surah, // Send your lastRead array in the request body
            {
              headers: {
                "Content-Type": "application/json", // Specify headers if required
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
      }
    }, [surah]);

    return (
        <BookedItem loading={loading} surahData={surahData}/>
    );
};

export default bookmarkSurah;