import BookedAyats from "@/components/BookedAyats";
import Offline from "@/components/Offline";
import Title from "@/components/Title";
import { surah } from "@/types/type";
import useNetworkStatus from "@/utils/hooks/useNetworkStatus";
import { removeAyat } from "@/utils/store/slices/bookmarkSlice";
import { RootState } from "@/utils/store/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

const PageTitle: React.FC = () => {
  return <Title title="সংরক্ষিত আয়াত তালিকা" subtitle="এখানে আপনি আপনার সংরক্ষিত আয়াতটি খুঁজে পেতে পারেন" btnText={false} />;
};

const bookmarkAyat = () => {
    const { ayat } = useSelector((state: RootState) => state.bookmark);

    const [loading, setLoading] = useState(true);
    const [ayatData, setAyatData] = useState<any[]>([]);
    const { isConnected, setIsConnected, checkNetworkStatus } = useNetworkStatus();
    const dispatch = useDispatch();

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

    const handleDeleteAyat = async (surahId: string, ayatId: string) => {
        try {
            // 1. Remove from Redux state immediately
            dispatch(removeAyat({ sId: surahId, aId: ayatId }));
            
            // 2. Update local state immediately for UI
            setAyatData(prevData => prevData.filter(item => item._id !== ayatId));
            
        } catch (error) {
            console.error("Error deleting ayat:", error);
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
        <BookedAyats 
            loading={loading} 
            ayatData={ayatData} 
            Component={PageTitle}
            onDeleteAyat={handleDeleteAyat}
        />
    );
};

export default bookmarkAyat;