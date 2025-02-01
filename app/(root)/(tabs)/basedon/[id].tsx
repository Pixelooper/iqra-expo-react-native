import Title from '@/components/Title';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import BookedAyats from '@/components/BookedAyats';
import { ayat } from '@/types/type';

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
                const response = await axios.get(`https://iqra-backend-git-master-iftikharrashas-projects.vercel.app/api/iqra/expo/basedon/${id}`);
                setAyatData(response.data.data.info);
                setTopic(response.data.data.topic)
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();

        // Optional: Cleanup to reset state when component unmounts
        return () => {
            setAyatData([]);
        };
    }, [id]);

    return (
        <BookedAyats loading={loading} ayatData={ayatData} Component={() => <Title title="আয়াত ভিত্তিক বিষয়:" subtitle={topic} btnText={false}/>}/>
    );
};

export default BasedOnPage;