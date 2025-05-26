import Title from '@/components/Title';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import BookedAyats from '@/components/BookedAyats';
import { ayat } from '@/types/type';
import useNetworkStatus from '@/utils/hooks/useNetworkStatus';
import Offline from '@/components/Offline';
import { View } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

type ayatData = ayat & {
    surahId: string;
    surahNo: number;
    surahName_bn: string;
};

const BasedOnPage = () => {
    const { id } = useLocalSearchParams();
    const [ayatData, setAyatData] = useState<ayatData | []>([]);
    const [topic, setTopic] = useState(String);
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
            
            const response = await axios.get(`${API_URL}/basedon/${id}`, {
                headers: {
                    Authorization: " Bearer " + JWT_TOKEN,
                }
            });
            setAyatData(response.data.data.info);
            setTopic(response.data.data.topic)
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        !isConnected ?  
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Offline connect={fetchData}/>
        </View> :
        <BookedAyats loading={loading} ayatData={ayatData} Component={() => <Title title="বিষয়ভিত্তিক আয়াত:" subtitle={topic} btnText={false}/>}/>
    );
};

export default BasedOnPage;