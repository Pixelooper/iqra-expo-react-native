import { router, useLocalSearchParams } from "expo-router";
import { Text, ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useEffect, useRef, useState } from "react";
import { ayat, surah } from "@/types/type";
import axios from "axios";
import SurahHead from "@/components/SurahHead";
import angleRight from "@/assets/icons/angle-right.png";
import AutoScrollToTop from "@/utils/AutoScrollToTop";
import { FlashList } from "@shopify/flash-list";
import { AyatList } from "@/components/AyatList";
import useNetworkStatus from "@/utils/hooks/useNetworkStatus";
import Offline from "@/components/Offline";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

const Ayat = () => {
    const { id, aid } = useLocalSearchParams();
    const [surahData, setSurahData] = useState<surah | null>(null);
    const [ayatData, setAyatData] = useState<ayat | null>(null);
    const [loading, setLoading] = useState(true);
    const flashListRef = useRef<FlashList<any>>(null);
    const { isConnected, setIsConnected, checkNetworkStatus } = useNetworkStatus();

    const fetchData = async () => {
        setLoading(true);

        try {
            const connected = await checkNetworkStatus();
            if (!connected) {
                console.log("No internet connection.");
                setIsConnected(false);
                setSurahData(null);
                setAyatData(null);
                return;
            }
            setIsConnected(true);
            
            const response = await axios.get(`${API_URL}/singleayat/${id}/${aid}`, {
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

    useEffect(() => {
        fetchData();
    }, [id, aid]);

    return (
        !isConnected ?  
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Offline connect={fetchData}/>
        </View> :
        <SafeAreaView className="bg-white">
            <AutoScrollToTop>
                <View className="w-full min-h-screen px-4 pt-14 mb-20">
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

                                <View className="mb-4 py-2">
                                    {ayatData?.shanenuzul && 
                                    <View className="mt-2">
                                        <Text> 
                                            <Text className="text-sm leading-6 font-NotoSansBengaliSemiBold text-yellow-400">শানে নুযূল: </Text> 
                                            <Text className="text-sm leading-6 text-black font-NotoSansBengali">{ayatData?.shanenuzul}</Text>   
                                        </Text>
                                    </View>
                                    }
                                    {ayatData?.quote && 
                                    <View className="mt-2">
                                        <Text> 
                                            <Text className="text-sm leading-6 font-NotoSansBengaliSemiBold text-yellow-400">লেখকের কথা: </Text> 
                                            <Text className="text-sm leading-6 text-black font-NotoSansBengali">{ayatData?.quote}</Text>   
                                        </Text>
                                    </View>
                                    }
                                </View>
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

export default Ayat;