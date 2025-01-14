import { router, useLocalSearchParams } from "expo-router";
import { Text, ActivityIndicator, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { ayat, surah } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";
import TafsirTexts from "@/components/TafsirTexts";
import SurahHead from "@/components/SurahHead";
import SingleAyat from "@/components/SingleAyat";

const Tafsir = () => {
    const { id, aid } = useLocalSearchParams();
    const [surahData, setSurahData] = useState<surah | null>(null);
    const [ayatData, setAyatData] = useState<ayat | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
                const response = await axios.get(
                    `https://iqra-backend-git-master-iftikharrashas-projects.vercel.app/api/iqra/expo/tafsir/${id}/${aid}`
                );
                setSurahData(response.data.data);
                setAyatData(response.data.data.ayat[0]);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();

        // Optional: Cleanup to reset state when component unmounts
        return () => {
            setSurahData(null);
            setAyatData(null);
        };
    }, [id, aid]);

    return (
        <SafeAreaView className="bg-white">
            {
                loading ? 
                <View className="min-h-screen d-flex justify-center">
                    <ActivityIndicator size="large" color="#00ff00"/>
                </View> :
                <View className="w-full px-2 mt-14 mb-20">
                    <SurahHead
                        ar={surahData?.name_ar}
                        bn={surahData?.name_bn}
                        total={surahData?.totalAyat}
                        tafsir={true}
                    />
                    <FlatList 
                        data={[]} 
                        renderItem={null}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:260}}
                        className="mt-6 px-4 pt-6 text-white border border-gray-white bg-white rounded-3xl"
                        ListEmptyComponent={
                            <View>
                                <SingleAyat 
                                    no={ayatData?.no ?? 0} 
                                    sid={surahData?._id ?? 0} 
                                    aid={ayatData?._id ?? 0} 
                                    ar={ayatData?.ar || ""} 
                                    bn={ayatData?.bn || ""}
                                    tafsirPage={true}
                                />
                                <Text className="mt-6"> 
                                    <Text className="text-sm font-AnekBanglaSemiBold text-yellow-400">তাফসির: </Text> 
                                </Text>
                                <TafsirTexts tafsir={ayatData?.tafsir || []} />
                                <View className="flex flex-row justify-between mt-4">
                                    <CustomButton
                                        title="পূর্ববর্তী"
                                        onPress={() => {router.push(`/tafsir/${surahData?._id}/${ayatData?._id}`)}}
                                        className="bg-yellow-500 text-dark-green px-6 py-3 rounded-lg font-AnekBanglaSemiBold text-sm"
                                    />
                                    <CustomButton
                                        title="পরবর্তী"
                                        onPress={() => {router.push(`/tafsir/${surahData?._id}/${ayatData?._id}`)}}
                                        className="bg-yellow-500 text-dark-green px-6 py-3 rounded-lg font-AnekBanglaSemiBold text-sm"
                                    />
                                </View>
                            </View>
                        }
                    />
                </View>
            }
        </SafeAreaView>
    );
};

export default Tafsir;