import { router, useLocalSearchParams } from "expo-router";
import { Text, ActivityIndicator, ScrollView, ImageBackground, View, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { surahList } from "@/constants";
import { useEffect, useState } from "react";
import bg from "@/assets/images/pattern.png";
import CustomButton from "@/components/CustomButton";

const Tafsir = () => {
    const { id, aid } = useLocalSearchParams();
    const [surahData, setSurahData] = useState<typeof surahList[0] | null>(null);
    const [ayatData, setAyatData] = useState<{} | null>(null);

    useEffect(() => {
        const surah = surahList.find(surah => surah.no == id);
        const ayat = surah?.ayat.find(ayat => ayat.no == aid);
        setSurahData(surah || null);
        setAyatData(ayat || null);
    }, [surahList, id]);

    return (
        <SafeAreaView>
            <ScrollView>
                <ImageBackground source={bg} resizeMode="repeat" className="min-h-screen flex justify-center bg-light-olive">
                    <View className="w-full px-2 mt-24">
                        {
                            !surahList || !surahData || !ayatData ? 
                            <ActivityIndicator size="large" color="#00ff00"/> :
                            <View className="mb-6">
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

                                <View className="mt-6 px-4 pt-6 text-white bg-pattern-aotd bg-dark-green rounded-3xl">
                                    <View className="text-center mb-8">
                                        <Text className="text-2xl font-AnekBanglaSemiBold text-yellow-400 mb-4 text-center">
                                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                                        </Text>
                                        <Text className="text-sm text-gray-100 mb-4 text-center">
                                            পরম করুণাময় অসীম দয়ালু আল্লাহতায়ালার নামে
                                        </Text>
                                    </View>
                                    <View className="mb-4">
                                        <View className="flex flex-row justify-between mb-4">
                                            <Text className="text-lg font-AnekBanglaSemiBold text-yellow-400 mb-2">
                                                {ayatData?.no}
                                            </Text>
                                            <View className="flex flex-row justify-between gap-2">
                                                <TouchableOpacity>
                                                    <Text className="text-lg font-AnekBangla">🌐</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Text className="text-lg font-AnekBangla">🔖</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Text className="text-lg font-AnekBangla">⚙️</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Text className="text-lg font-AnekBangla">🔽</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View className="border-b-2 border-yellow-400 pb-4">
                                            <Text className="text-2xl text-white mb-6 text-right">
                                                {ayatData?.ar}
                                            </Text>
                                            <Text className="text-sm text-white mb-2 font-AnekBangla">
                                                {ayatData?.bn}
                                            </Text>
                                            <Text className="mt-6"> 
                                                <Text className="text-sm font-AnekBanglaSemiBold text-yellow-400">তাফসির: </Text> 
                                                <Text className="text-sm text-white mb-2 font-AnekBangla">তাফসির:  {ayatData?.tafsir}</Text> 
                                            </Text>
                                        </View>
                                        <View className="flex flex-row justify-between mt-4">
                                            <CustomButton
                                                title="পূর্ববর্তী"
                                                onPress={() => {router.replace(`/(public)/tafsir/${surahData?.no}/${ayatData?.no - 1}`)}}
                                                className="bg-yellow-500 text-dark-green px-6 py-3 rounded-lg font-AnekBanglaSemiBold text-sm"
                                            />
                                            <CustomButton
                                                title="পরবর্তী"
                                                onPress={() => {router.replace(`/(public)/tafsir/${surahData?.no}/${ayatData?.no + 1}`)}}
                                                className="bg-yellow-500 text-dark-green px-6 py-3 rounded-lg font-AnekBanglaSemiBold text-sm"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Tafsir;