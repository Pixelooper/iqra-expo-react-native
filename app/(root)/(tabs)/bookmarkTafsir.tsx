import BookedAyats from "@/components/BookedAyats";
import BookedTafsirs from "@/components/BookedTafsirs";
import Offline from "@/components/Offline";
import Title from "@/components/Title";
import { surah } from "@/types/type";
import useNetworkStatus from "@/utils/hooks/useNetworkStatus";
import { RootState } from "@/utils/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { View } from "react-native";
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
    const { isConnected, setIsConnected, checkNetworkStatus } = useNetworkStatus();

    const fetchData = async () => {
        setLoading(true);

        try {
            const connected = await checkNetworkStatus();
            if (!connected) {
                console.log("No internet connection.");
                setIsConnected(false);
                setTafsirData([]);
                return;
            }
            setIsConnected(true);

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
            setTafsirData(response.data.data);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tafsir]);

    return (
        !isConnected ?  
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Offline connect={fetchData}/>
        </View> :
        <BookedTafsirs loading={loading} tafsirData={tafsirData} Component={PageTitle}/>
    );
};

export default bookmarkTafsir;