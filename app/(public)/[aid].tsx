import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { ayat, surah } from "@/types/type";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import SurahHead from "@/components/SurahHead";
import { AyatList } from "@/components/AyatList";
import { FlashList } from "@shopify/flash-list";
import AutoScrollToTop from "@/utils/AutoScrollToTop";

const Tafsir = () => {
    const { id, aid } = useLocalSearchParams();
    const [surahData, setSurahData] = useState<surah | null>(null);
    const [ayatData, setAyatData] = useState<ayat | null>(null);
    const [ayatNo, setAyatNo] = useState<number | 0>(0);
    const [loading, setLoading] = useState(true);
    const flashListRef = useRef<FlashList<any>>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://iqra-backend-git-master-iftikharrashas-projects.vercel.app/api/iqra/expo/tafsir/${id}/${aid}`
                );
                // Reset states before setting new data
                setSurahData(null);
                setAyatData(null);
                setAyatNo(0);
                
                setSurahData(response.data.data);
                setAyatData(response.data.data.ayat);
                setAyatNo(response.data.data.ayat[0].no);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            setSurahData(null);
            setAyatData(null);
        };
    }, [id, aid]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true); 
    //         try {
    //             const response = await axios.get(
    //                 `https://iqra-backend-git-master-iftikharrashas-projects.vercel.app/api/iqra/expo/tafsir/${id}/${aid}`
    //             );
    //             setSurahData(response.data.data);
    //             setAyatData(response.data.data.ayat);
    //             setAyatNo(response.data.data.ayat[0].no);
    //         } catch (error) {
    //             console.error("Error fetching data", error);
    //         } finally {
    //             setLoading(false); 
    //         }
    //     };

    //     fetchData();

    //     // Optional: Cleanup to reset state when component unmounts
    //     return () => {
    //         setSurahData(null);
    //         setAyatData(null);
    //     };
    // }, [id, aid]);

    return (
        <SafeAreaView className="bg-white">
            <AutoScrollToTop>
                <View className="w-full px-4 pt-14 mb-20">
                {
                    loading ? 
                    <View className="min-h-screen d-flex justify-center">
                        <ActivityIndicator size="large" color="#00ff00"/>
                    </View> :
                    <View className="mb-6">
                        <SurahHead
                            ar={surahData?.name_ar}
                            bn={surahData?.name_bn}
                            total={surahData?.totalAyat}
                            tafsir={true}
                        />
                        <View className="mt-2 px-4 pt-6 text-dark-greem  border border-gray-white bg-white rounded-3xl" style={{ 
                            flex: 1,
                            minHeight: 200,
                            backgroundColor: 'transparent' 
                        }}>
                            <AyatList
                                key={`${id}-${aid}`}
                                sid={id}
                                data={ayatData}
                                flashListRef={flashListRef}
                                tafsirPage={true}
                                currentAyatId={aid}
                            />
                            <View className="flex flex-row justify-between mb-4">
                                <CustomButton
                                    title="পূর্ববর্তী"
                                    onPress={() => {router.push(`/tafsir/${surahData?.no}/${ayatNo - 1}`)}}
                                    className={`px-6 py-1 rounded-lg text-sm border-dark-green ${
                                        ayatNo === 1 ? "opacity-40 cursor-not-allowed" : ""
                                    }`}
                                    disabled={ayatData?.no === 1}
                                    bgVariant="primary"
                                    textVariant="secondary"
                                />
                                <CustomButton
                                    title="পরবর্তী"
                                    onPress={() => {router.push(`/tafsir/${surahData?.no}/${ayatNo + 1}`)}}
                                    className={`px-6 py-1 rounded-lg text-sm border-dark-green ${
                                        ayatNo === surahData?.totalAyat ? "opacity-40 cursor-not-allowed" : ""
                                    }`}
                                    disabled={ayatNo === surahData?.totalAyat}
                                    bgVariant="primary"
                                    textVariant="secondary"
                                />
                            </View>
                        </View>
                    </View>
                }
                </View>
            </AutoScrollToTop>
        </SafeAreaView>
    );
};

export default Tafsir;