import BookedAyats from "@/components/BookedAyats";
import Offline from "@/components/Offline";
import Title from "@/components/Title";
import { surah } from "@/types/type";
import useNetworkStatus from "@/utils/hooks/useNetworkStatus";
import { RootState } from "@/utils/store/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
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
    const { isConnected, setIsConnected, checkNetworkStatus } = useNetworkStatus();

    const fetchData = async () => {
        setLoading(true);

        try {
            const connected = await checkNetworkStatus();
            if (!connected) {
                console.log("No internet connection.");
                setIsConnected(false);
                setAyatData([]);
                return;
            }
            setIsConnected(true);

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
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [ayat]);

    return (
        !isConnected ?  
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Offline connect={fetchData}/>
        </View> :
        <BookedAyats loading={loading} ayatData={ayatData} Component={PageTitle}/>
    );
};

export default bookmarkAyat;