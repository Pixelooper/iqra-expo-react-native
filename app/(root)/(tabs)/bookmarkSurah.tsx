import BookedItem from "@/components/BookedItem";
import Offline from "@/components/Offline";
import { surah } from "@/types/type";
import useNetworkStatus from "@/utils/hooks/useNetworkStatus";
import { removeSurah } from "@/utils/store/slices/bookmarkSlice";
import { RootState } from "@/utils/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

const bookmarkSurah = () => {
    const { surah: bookmarkedSurahIds } = useSelector((state: RootState) => state.bookmark);
    const [loading, setLoading] = useState(true);
    const [surahData, setSurahData] = useState<surah[]>([]);
    const { isConnected, setIsConnected, checkNetworkStatus } = useNetworkStatus();
    const dispatch = useDispatch();

    const fetchData = async () => {
        setLoading(true);

        try {
            const connected = await checkNetworkStatus();
            if (!connected) {
                console.log("No internet connection.");
                setIsConnected(false);
                setSurahData([]);
                return;
            }
            setIsConnected(true);

            const response = await axios.post(
            `${API_URL}/lastread`,
              bookmarkedSurahIds,
              {
                headers: {
                  "Content-Type": "application/json",
                Authorization: " Bearer " + JWT_TOKEN,
                },
              }
            );
            setSurahData(response.data.data);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };


    const handleDeleteSurah = async (surahId: number) => {
        try {
            // 1. Remove from Redux state immediately
            dispatch(removeSurah(surahId));
            
            // 2. Update local state immediately for UI
            setSurahData(prevData => prevData.filter(item => item._id !== surahId));
            
        } catch (error) {
            console.error("Error deleting surah:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [bookmarkedSurahIds]);

    return (
        !isConnected ?  
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Offline connect={fetchData}/>
        </View> :
        <BookedItem 
            loading={loading} 
            surahData={surahData}
            onDeleteSurah={handleDeleteSurah}
        />
    );
};

export default bookmarkSurah;