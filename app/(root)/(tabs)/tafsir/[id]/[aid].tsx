import { router, useLocalSearchParams } from "expo-router";
import { Text, ActivityIndicator, ImageBackground, View, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import bg from "@/assets/images/pattern.png";
import CustomButton from "@/components/CustomButton";
import { ayat, surah } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";
import TafsirTexts from "@/components/TafsirTexts";

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
        <SafeAreaView className="bg-light-olive">
            {
                loading ? 
                <View className="min-h-screen d-flex justify-center">
                    <ActivityIndicator size="large" color="#00ff00"/>
                </View> :
                <View className="w-full px-2 mt-8 mb-20">
                    <View>
                        <Text className="text-center text-3xl text-green-950 mb-2">
                            سورة {surahData?.name_ar}
                        </Text>
                        <Text className="text-center text-lg font-AnekBanglaMedium text-green-950 mb-1">
                            সূরা {surahData?.name_bn}
                        </Text>
                        <Text className="text-center text-sm text-gray-600">
                            তাফসীর ইবনে কাসীর
                        </Text>
                    </View>

                    <FlatList 
                        data={[]} 
                        renderItem={null}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:200}}
                        className="mt-6 px-4 pt-6 text-white bg-dark-green rounded-3xl"
                        ListEmptyComponent={
                            <View className="mb-4">
                                <View className="flex flex-row justify-between mb-4">
                                    <Text className="text-lg font-AnekBanglaSemiBold text-yellow-400 mb-2">
                                        {ayatData?.no}
                                    </Text>
                                    <View className="flex flex-row justify-between gap-2">
                                        <TouchableOpacity>
                                            <Text className="text-lg font-AnekBangla">🔖</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text className="text-lg font-AnekBangla">⚙️</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    <Text className="text-2xl text-white mb-6 text-right">
                                        {ayatData?.ar}
                                    </Text>
                                    <Text className="text-sm text-white mb-2 font-AnekBangla">
                                        {ayatData?.bn}
                                    </Text>
                                    <Text className="mt-6"> 
                                        <Text className="text-sm font-AnekBanglaSemiBold text-yellow-400">তাফসির: </Text> 
                                    </Text>
                                    <TafsirTexts tafsir={ayatData?.tafsir || []} />
                                </View>
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