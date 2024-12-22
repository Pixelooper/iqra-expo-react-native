import { router, useLocalSearchParams } from "expo-router";
import { Text, ActivityIndicator, ScrollView, ImageBackground, View, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import bg from "@/assets/images/pattern.png";
import CustomButton from "@/components/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import { selectAyatById, selectSurahById } from "@/utils/selectors";
import { ayat } from "@/types/type";

const Tafsir = () => {
    const { id, aid } = useLocalSearchParams();

    const surahDetails = useSelector((state: RootState) =>
        selectSurahById(Number(id))(state)
    );

    const ayatDetails = useSelector((state: RootState) =>
        selectAyatById(Number(id), Number(aid))(state)
    );

    return (
        <SafeAreaView>
            <ScrollView>
                <ImageBackground source={bg} resizeMode="repeat" className="min-h-screen flex justify-center bg-light-olive">
                    <View className="w-full px-2 mt-24 mb-20">
                        {
                            !surahDetails || !ayatDetails ? 
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
                                                {ayatDetails?.no}
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
                                                {ayatDetails?.ar}
                                            </Text>
                                            <Text className="text-sm text-white mb-2 font-AnekBangla">
                                                {ayatDetails?.bn}
                                            </Text>
                                            <Text className="mt-6"> 
                                                <Text className="text-sm font-AnekBanglaSemiBold text-yellow-400">তাফসির: </Text> 
                                                {ayatDetails?.tafsir.map((ayat: ayat) => ( 
                                                    <Text key={ayat._id} className="text-sm text-white mb-2 font-AnekBangla">তাফসির:  {ayat}</Text> 
                                                ))}
                                            </Text>
                                        </View>
                                        <View className="flex flex-row justify-between mt-4">
                                            <CustomButton
                                                title="পূর্ববর্তী"
                                                onPress={() => {router.replace(`/tafsir/${surahDetails?.no}/${ayatDetails?.no - 1}`)}}
                                                className="bg-yellow-500 text-dark-green px-6 py-3 rounded-lg font-AnekBanglaSemiBold text-sm"
                                            />
                                            <CustomButton
                                                title="পরবর্তী"
                                                onPress={() => {router.replace(`/tafsir/${surahDetails?.no}/${ayatDetails?.no + 1}`)}}
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