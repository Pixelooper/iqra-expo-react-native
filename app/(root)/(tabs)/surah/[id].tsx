import { router, useLocalSearchParams } from "expo-router";
import { Text, ActivityIndicator, ScrollView, ImageBackground, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import bg from "@/assets/images/pattern.png";
import CustomButton from "@/components/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import { selectSurahById } from "@/utils/selectors";

const Surah = () => {
    const { id } = useLocalSearchParams();

    const surahDetails = useSelector((state: RootState) =>
        selectSurahById(Number(id))(state)
    );

    return (
        <SafeAreaView>
            <ScrollView>
                <ImageBackground source={bg} resizeMode="repeat" className="min-h-screen flex justify-center bg-light-olive">
                    <View className="w-full px-2 mt-24 mb-20">
                        {
                            !surahDetails ? 
                            <ActivityIndicator size="large" color="#00ff00"/> :
                            <View className="mb-6">
                                <View>
                                    <Text className="text-center text-3xl text-green-950 mb-2">
                                        سورة {surahDetails?.name_ar}
                                    </Text>
                                    <Text className="text-center text-lg font-AnekBanglaMedium text-green-950 mb-1">
                                        সূরা {surahDetails?.name_bn}
                                    </Text>
                                    <Text className="text-center text-sm text-gray-600">
                                        আয়াত সংখ্যা {surahDetails?.totalAyat}
                                    </Text>
                                </View>

                                <View className="mb-4 py-2">
                                    <View className="flex flex-row justify-between my-4">
                                        <Text className="text-lg font-AnekBanglaSemiBold text-yellow-400">
                                            পারা {surahDetails?.para} / সূরা {surahDetails?.no}
                                        </Text>
                                        <TouchableOpacity>
                                            <Text className="text-lg font-AnekBangla">⭐</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View className="flex flex-row justify-between mb-4">
                                        <Text className="text-sm font-AnekBanglaSemiBold">{surahDetails?.place}</Text>
                                        <Text className="text-sm font-AnekBanglaSemiBold">রুকুঃ {surahDetails?.ruku}</Text>
                                    </View>
                                    {surahDetails?.naming && 
                                    <View className="mt-2">
                                        <Text> 
                                            <Text className="text-sm font-AnekBanglaSemiBold text-yellow-400">নামকরণ: </Text> 
                                            <Text className="text-sm text-black font-AnekBangla">{surahDetails?.naming}</Text>   
                                        </Text>
                                    </View>
                                    }
                                    {surahDetails?.shanenuzul && 
                                    <View className="mt-2">
                                        <Text> 
                                            <Text className="text-sm font-AnekBanglaSemiBold text-yellow-400">শানে নুযূল: </Text> 
                                            <Text className="text-sm text-black font-AnekBangla">{surahDetails?.shanenuzul}</Text>   
                                        </Text>
                                    </View>
                                    }
                                    {surahDetails?.fazilat && 
                                    <View className="mt-2">
                                        <Text> 
                                            <Text className="text-sm font-AnekBanglaSemiBold text-yellow-400">ফজিলত: </Text> 
                                            <Text className="text-sm text-black font-AnekBangla">{surahDetails?.fazilat}</Text>   
                                        </Text>
                                    </View>
                                    }
                                    {surahDetails?.quote && 
                                    <View className="mt-2">
                                        <Text> 
                                            <Text className="text-sm font-AnekBanglaSemiBold text-yellow-400">লেখকের কথা: </Text> 
                                            <Text className="text-sm text-black font-AnekBangla">{surahDetails?.quote}</Text>   
                                        </Text>
                                    </View>
                                    }
                                </View>

                                <View className="mt-2 px-4 py-6 text-white bg-pattern-aotd bg-dark-green rounded-3xl">
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
                                                {surahDetails?.ayat[0]?.no}
                                            </Text>
                                            <View className="flex flex-row justify-between gap-2">
                                                <TouchableOpacity onPress={() => {router.push(`/tafsir/${surahDetails?.no}/${surahDetails?.ayat[0]?.no}`)}}>
                                                    <Text className="text-lg font-AnekBangla">🌐</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <Text className="text-lg font-AnekBangla">⚙️</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View className="border-b-2 border-yellow-400 pb-4">
                                            <Text className="text-2xl text-white mb-6 text-right">
                                                {surahDetails?.ayat[0]?.ar}
                                            </Text>
                                            <Text className="text-sm text-white mb-2 font-AnekBangla">
                                                {surahDetails?.ayat[0]?.bn}
                                            </Text>
                                        </View>
                                    </View>

                                    <View className="text-center pt-2">
                                        <CustomButton
                                            title="সব আয়াত পড়ুন"
                                            onPress={() => router.push(`/ayat/${surahDetails?.no}`)}
                                            className="bg-yellow-500 text-dark-green px-6 py-3 rounded-lg font-AnekBanglaSemiBold text-sm"
                                        />
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

export default Surah;