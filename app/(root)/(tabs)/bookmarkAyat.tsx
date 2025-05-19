import BookedAyats from "@/components/BookedAyats";
import Title from "@/components/Title";
import { surah } from "@/types/type";
import { RootState } from "@/utils/store/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

const PageTitle: React.FC = () => {
  return <Title title="সংরক্ষিত আয়াত তালিকা" subtitle="এখানে আপনি আপনার সংরক্ষিত আয়াতটি খুঁজে পেতে পারেন" btnText={false} />;
};

const bookmarkAyat = () => {
    const { ayat } = useSelector((state: RootState) => state.bookmark);

    const [loading, setLoading] = useState(true);
    const [ayatData, setAyatData] = useState<surah[]>([]);

    useEffect(() => {
      const fetchLastReadSurahs = async () => {
        setLoading(true); 

        try {
          const response = await axios.post(
          `${API_URL}/savedayats`,
            ayat, 
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: " Bearer " + JWT_TOKEN,
              },
            }
          );
          setAyatData(response.data.data);
        } catch (err) {
          console.error("Error fetching last read surahs:", err);
        } finally {
          setLoading(false); 
        }
      };

      // Fetch data only if `lastRead` has elements
      if (ayat.length > 0) {
        fetchLastReadSurahs();
      }else{
        setLoading(false); 
      }
    }, [ayat]);

    return (
        <BookedAyats loading={loading} ayatData={ayatData} Component={PageTitle}/>
    );
};

export default bookmarkAyat;