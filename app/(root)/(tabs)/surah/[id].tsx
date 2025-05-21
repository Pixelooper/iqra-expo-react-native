import { router, useLocalSearchParams } from "expo-router";
import { Text, ActivityIndicator, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useEffect, useRef, useState } from "react";
import { ayat, surah } from "@/types/type";
import axios from "axios";
import SurahHead from "@/components/SurahHead";
import angleRight from "@/assets/icons/angle-right.png";
import bookmark from "@/assets/icons/bookmark.png";
import AutoScrollToTop from "@/utils/AutoScrollToTop";
import { convertToBengaliDigits } from "@/utils/hooks/useBengaliDigit";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { addSurah } from "@/utils/store/slices/bookmarkSlice";
import { FlashList } from "@shopify/flash-list";
import { AyatList } from "@/components/AyatList";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

const Surah = () => {
    const { id } = useLocalSearchParams();
    const [surahData, setSurahData] = useState<surah | null>(null);
    const [ayatData, setAyatData] = useState<ayat | null>(null);
    const [loading, setLoading] = useState(true);
    const flashListRef = useRef<FlashList<any>>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
                const response = await axios.get(`${API_URL}/surah/${id}`, {
                    headers: {
                        Authorization: " Bearer " + JWT_TOKEN,
                    }
                });
                setSurahData(response.data.data);
                setAyatData(response.data.data.ayat)
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
                <View className="w-full px-4 mb-20" style={{ marginTop: Platform.OS === 'ios' ? 20 : 60 }}>
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
                                <View className="flex flex-row justify-between mt-4 mb-2">
                                    <Text className="text-lg leading-8 font-NotoSansBengaliSemiBold text-dark-green">
                                        পারা {convertToBengaliDigits(surahData?.para)} / সূরা {convertToBengaliDigits(surahData?.no)}
                                    </Text>
                                    <CustomButton
                                        title="সংরক্ষণ"
                                        className="rounded-2xl px-1 h-5 w-20 border-gray-white"
                                        ImgLeft={bookmark}
                                        onPress={() => handleSurahSave(surahData?._id)}
                                        bgVariant="secondary"
                                    />
                                </View>
                                <View className="flex flex-row justify-between mb-4">
                                    <Text className="text-sm leading-6 font-NotoSansBengaliSemiBold">{surahData?.place}</Text>
                                    <Text className="text-sm leading-6 font-NotoSansBengaliSemiBold">রুকুঃ {convertToBengaliDigits(surahData?.ruku)}</Text>
                                </View>
                                {surahData?.naming && 
                                <View className="mt-2">
                                    <Text> 
                                        <Text className="text-sm leading-6 font-NotoSansBengaliSemiBold text-yellow-400">নামকরণ: </Text> 
                                        <Text className="text-sm leading-6 text-black font-NotoSansBengali">{surahData?.naming}</Text>   
                                    </Text>
                                </View>
                                }
                                {surahData?.shanenuzul && 
                                <View className="mt-2">
                                    <Text> 
                                        <Text className="text-sm leading-6 font-NotoSansBengaliSemiBold text-yellow-400">শানে নুযূল: </Text> 
                                        <Text className="text-sm leading-6 text-black font-NotoSansBengali">{surahData?.shanenuzul}</Text>   
                                    </Text>
                                </View>
                                }
                                {surahData?.fazilat && 
                                <View className="mt-2">
                                    <Text> 
                                        <Text className="text-sm leading-6 font-NotoSansBengaliSemiBold text-yellow-400">ফজিলত: </Text> 
                                        <Text className="text-sm leading-6 text-black font-NotoSansBengali">{surahData?.fazilat}</Text>   
                                    </Text>
                                </View>
                                }
                                {surahData?.quote && 
                                <View className="mt-2">
                                    <Text> 
                                        <Text className="text-sm leading-6 font-NotoSansBengaliSemiBold text-yellow-400">লেখকের কথা: </Text> 
                                        <Text className="text-sm leading-6 text-black font-NotoSansBengali">{surahData?.quote}</Text>   
                                    </Text>
                                </View>
                                }
                            </View>
                            <View className="mt-2 px-4 pt-6 text-dark-greem  border border-gray-white bg-white rounded-3xl" style={{ 
                                flex: 1,
                                minHeight: 200,
                                backgroundColor: 'transparent' 
                            }}>
                                <AyatList
                                    sid={id}
                                    data={ayatData}
                                    flashListRef={flashListRef}
                                    tafsirPage={false}
                                />
                                <View className="text-center pb-4">
                                    <CustomButton
                                        title="সব আয়াত পড়ুন"
                                        onPress={() => {router.push(`/ayats/${id}`)}} 
                                        className="bg-dark-green px-6 py-3 rounded-lg font-NotoSansBengaliSemiBold border-dark-green"
                                        bgVariant="primary"
                                        textVariant="secondary"
                                        ImgRight={angleRight}
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

export default Surah;