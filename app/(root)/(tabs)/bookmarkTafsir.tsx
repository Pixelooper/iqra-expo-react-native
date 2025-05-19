import BookedAyats from "@/components/BookedAyats";
import BookedTafsirs from "@/components/BookedTafsirs";
import Title from "@/components/Title";
import { surah } from "@/types/type";
import { RootState } from "@/utils/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

const PageTitle: React.FC = () => {
  return <Title title="সংরক্ষিত তাফসীর তালিকা" subtitle="এখানে আপনি আপনার সংরক্ষিত তাফসীরটি খুঁজে পেতে পারেন" btnText={false} />;
};

const bookmarkTafsir = () => {
    const { tafsir } = useSelector((state: RootState) => state.bookmark);

    const [loading, setLoading] = useState(true);
    const [tafsirData, setTafsirData] = useState<surah[]>([]);

    useEffect(() => {
      const fetchLastReadSurahs = async () => {
        setLoading(true); 

        try {
          const response = await axios.post(
          `${API_URL}/savedtafsirs`,
            tafsir, 
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: " Bearer " + JWT_TOKEN,
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
        <BookedTafsirs loading={loading} tafsirData={tafsirData} Component={PageTitle}/>
    );
};

export default bookmarkTafsir;