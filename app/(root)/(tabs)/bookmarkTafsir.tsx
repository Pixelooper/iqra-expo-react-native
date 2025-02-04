import BookedAyats from "@/components/BookedAyats";
import BookedTafsirs from "@/components/BookedTafsirs";
import { surah } from "@/types/type";
import { RootState } from "@/utils/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const bookmarkTafsir = () => {
    const { tafsir } = useSelector((state: RootState) => state.bookmark);

    const [loading, setLoading] = useState(true);
    const [tafsirData, setTafsirData] = useState<surah[]>([]);

    useEffect(() => {
      const fetchLastReadSurahs = async () => {
        setLoading(true); 

        try {
          const response = await axios.post(
            "https://iqra-backend-git-master-iftikharrashas-projects.vercel.app/api/iqra/expo/savedtafsirs",
            tafsir, 
            {
              headers: {
                "Content-Type": "application/json", // Specify headers if required
              },
            }
          );
          setTafsirData(response.data.data); // Assuming `data.data` is the correct response
        } catch (err) {
          console.error("Error fetching last read surahs:", err);
        } finally {
          setLoading(false); 
        }
      };

      // Fetch data only if `lastRead` has elements
      if (tafsir.length > 0) {
        fetchLastReadSurahs();
      }else{
        setLoading(false); 
      }
    }, [tafsir]);

    return (
        <BookedTafsirs loading={loading} tafsirData={tafsirData}/>
    );
};

export default bookmarkTafsir;