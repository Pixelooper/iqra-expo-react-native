import { router, useLocalSearchParams } from "expo-router";
import { Text, ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import { ayat, surah } from "@/types/type";
import axios from "axios";
import SurahHead from "@/components/SurahHead";
import SingleAyat from "@/components/SingleAyat";
import angleRight from "@/assets/icons/angle-right.png";
import bookmark from "@/assets/icons/bookmark.png";
import AutoScrollToTop from "@/utils/AutoScrollToTop";
import { convertToBengaliDigits } from "@/utils/hooks/useBengaliDigit";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { addSurah } from "@/utils/store/slices/bookmarkSlice";

const Surah = () => {
    const { id } = useLocalSearchParams();
    const [surahData, setSurahData] = useState<surah | null>(null);
    const [ayatData, setAyatData] = useState<ayat | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
                const response = await axios.get(`https://iqra-backend-git-master-iftikharrashas-projects.vercel.app/api/iqra/expo/surah/${id}`);
                setSurahData(response.data.data);
                setAyatData(response.data.data.ayat[0])
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
    }, [id]);

    const dispatch = useDispatch();
    const handleSurahSave = (surahId: string) => {
        dispatch(addSurah(surahId));
    
        Toast.show({
          type: "success",
          text1: "Item Saved!",
          text2: "আপনার সূরাটি সফলভাবে সংরক্ষণ করা হয়েছে।",
        });
    };

    return (
        <SafeAreaView className="bg-white">
            <AutoScrollToTop>
                <View className="w-full px-4 pt-14 mb-20">
                    {
                        loading ? 
                        <View className="min-h-screen d-flex justify-center">
                            <ActivityIndicator size="large" color="#00ff00"/>
                        </View>  :
                        <View className="mb-6">
                            <SurahHead
                                ar={surahData?.name_ar}
                                bn={surahData?.name_bn}
                                total={surahData?.totalAyat}
                                tafsir={false}
                            />

                            <View className="mb-4 py-2">
                                <View className="flex flex-row justify-between my-4">
                                    <Text className="text-lg font-AnekBanglaSemiBold text-dark-green">
                                        পারা {convertToBengaliDigits(surahData?.para)} / সূরা {convertToBengaliDigits(surahData?.no)}
                                    </Text>
                                    <CustomButton
                                        title="সংরক্ষণ"
                                        className="rounded-2xl py-1 px-1 h-5 w-[68px] border-gray-white"
                                        ImgLeft={bookmark}
                                        onPress={() => handleSurahSave(surahData?._id)}
                                    />
                                </View>
                                <View className="flex flex-row justify-between mb-4">
                                    <Text className="text-sm font-AnekBanglaSemiBold">{surahData?.place}</Text>
                                    <Text className="text-sm font-AnekBanglaSemiBold">রুকুঃ {convertToBengaliDigits(surahData?.ruku)}</Text>
                                </View>
                                {surahData?.naming && 
                                <View className="mt-2">
                                    <Text> 
                                        <Text className="text-sm font-AnekBanglaSemiBold text-yellow-400">নামকরণ: </Text> 
                                        <Text className="text-sm text-black font-AnekBangla">{surahData?.naming}</Text>   
                                    </Text>
                                </View>
                                }
                                {surahData?.shanenuzul && 
                                <View className="mt-2">
                                    <Text> 
                                        <Text className="text-sm font-AnekBanglaSemiBold text-yellow-400">শানে নুযূল: </Text> 
                                        <Text className="text-sm text-black font-AnekBangla">{surahData?.shanenuzul}</Text>   
                                    </Text>
                                </View>
                                }
                                {surahData?.fazilat && 
                                <View className="mt-2">
                                    <Text> 
                                        <Text className="text-sm font-AnekBanglaSemiBold text-yellow-400">ফজিলত: </Text> 
                                        <Text className="text-sm text-black font-AnekBangla">{surahData?.fazilat}</Text>   
                                    </Text>
                                </View>
                                }
                                {surahData?.quote && 
                                <View className="mt-2">
                                    <Text> 
                                        <Text className="text-sm font-AnekBanglaSemiBold text-yellow-400">লেখকের কথা: </Text> 
                                        <Text className="text-sm text-black font-AnekBangla">{surahData?.quote}</Text>   
                                    </Text>
                                </View>
                                }
                            </View>

                            <View className="mt-2 px-4 py-6 border border-gray-white bg-white rounded-3xl">
                                <View className="text-center mb-8">
                                    <Text className="text-2xl text-dark-green mb-4 text-center">
                                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                                    </Text>
                                    <Text className="text-sm font-AnekBangla text-dark-green mb-4 text-center">
                                        পরম করুণাময় অসীম দয়ালু আল্লাহতায়ালার নামে
                                    </Text>
                                </View>

                                <SingleAyat 
                                    no={ayatData?.no ?? 0} 
                                    sid={surahData?._id ?? 0} 
                                    aid={ayatData?._id ?? 0} 
                                    ar={ayatData?.ar || ""} 
                                    bn={ayatData?.bn || ""}
                                    tafsirPage={false}
                                />

                                <View className="text-center pt-2">
                                    <CustomButton
                                        title="সব আয়াত পড়ুন"
                                        onPress={() => router.push(`/ayat/${surahData?._id}`)}
                                        className="bg-dark-green px-6 py-3 rounded-lg font-AnekBanglaSemiBold text-sm border-dark-green"
                                        bgVariant="primary"
                                        textVariant="primary"
                                        ImgRight={angleRight}
                                    />
                                </View>
                            </View>
                        </View>
                    }
                </View>
                <Toast />
            </AutoScrollToTop>
        </SafeAreaView>
    );
};

export default Surah;