import { router, useLocalSearchParams } from "expo-router";
import { Text, ActivityIndicator, View, FlatList, Platform } from "react-native";
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
    const [ayatNo, setAyatNo] = useState<number | 0>(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
                const response = await axios.get(
                    `https://iqra-backend-git-master-iftikharrashas-projects.vercel.app/api/iqra/expo/tafsir/${id}/${aid}`
                );
                setSurahData(response.data.data);
                setAyatData(response.data.data.ayat[0]);
                setAyatNo(response.data.data.ayat[0].no);
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
                <View className="w-full px-2 mb-20" style={{ marginTop: Platform.OS === 'ios' ? 20 : 60 }}>
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
                        className="mt-2 px-4 pt-4 text-white border border-gray-white bg-white rounded-3xl"
                        ListEmptyComponent={
                            <View>
                                <SingleAyat 
                                    no={ayatData?.no ?? 0} 
                                    sid={surahData?._id ?? ""} 
                                    aid={ayatData?._id ?? ""} 
                                    ar={ayatData?.ar || ""} 
                                    bn={ayatData?.bn || ""}
                                    tafsirPage={true}
                                />
                                <Text className="mt-3"> 
                                    <Text className="text-sm leading-6 font-AnekBanglaSemiBold text-yellow-400">তাফসির: </Text> 
                                </Text>
                                <TafsirTexts tafsir={ayatData?.tafsir || []} />
                                <View className="flex flex-row justify-between">
                                    <CustomButton
                                        title="পূর্ববর্তী"
                                        onPress={() => {router.push(`/tafsir/${surahData?.no}/${ayatNo - 1}`)}}
                                        className={`px-6 rounded-lg border-dark-green ${
                                            ayatNo === 1 ? "opacity-40 cursor-not-allowed" : ""
                                        }`}
                                        disabled={ayatData?.no === 1}
                                        bgVariant="primary"
                                        textVariant="secondary"
                                    />
                                    <CustomButton
                                        title="পরবর্তী"
                                        onPress={() => {router.push(`/tafsir/${surahData?.no}/${ayatNo + 1}`)}}
                                        className={`px-6 rounded-lg border-dark-green ${
                                            ayatNo === surahData?.totalAyat ? "opacity-40 cursor-not-allowed" : ""
                                        }`}
                                        disabled={ayatNo === surahData?.totalAyat}
                                        bgVariant="primary"
                                        textVariant="secondary"
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