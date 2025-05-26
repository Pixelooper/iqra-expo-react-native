import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ayat } from "@/types/type";
import Title from "@/components/Title";
import axios from "axios";
import BookedAyats from "@/components/BookedAyats";
import useNetworkStatus from "@/utils/hooks/useNetworkStatus";
import { View } from "react-native";
import Offline from "@/components/Offline";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

type MoodAyatsProps = {
    loading: boolean;
    ayatData: ayat & {
        surahId: string;
        surahNo: number;
        surahName_bn: string;
    };
};

const MoodAyats: React.FC<MoodAyatsProps> = () => {
    const { slug } = useLocalSearchParams();
    const [ayatData, setAyatData] = useState([]);
    const [loading, setLoading] = useState(true);
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
            
            const response = await axios.get(`${API_URL}/mood?mood=${slug}`, {
                headers: {
                    Authorization: " Bearer " + JWT_TOKEN,
                }
            });
            setAyatData(response.data.data);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [slug]);

    return (
        !isConnected ?  
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Offline connect={fetchData}/>
        </View> :
        <BookedAyats loading={loading} ayatData={ayatData} Component={() => <Title title={`মেজাজভিত্তিক আয়াত: ${slug}`} subtitle="এখানে আপনি আপনার মেজাজের উপর ভিত্তি করে আয়াত পাবেন" btnText={false} />}/>
    );
};

export default MoodAyats;