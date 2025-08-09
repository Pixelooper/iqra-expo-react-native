import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { Image, Text, View, ActivityIndicator, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import splash from "@/assets/images/splash.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/store/store";
import { useEffect } from "react";
import { fetchHomeData } from "@/utils/store/slices/homeSlice";
import angleRight from "@/assets/icons/angle-right.png";

const Splash = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.home);

    useEffect(() => {
        dispatch(fetchHomeData());
    }, [dispatch])

    return (
        <SafeAreaView className="min-h-screen flex justify-center bg-white">
                <Text className="text-green-500 text-lg text-center font-NotoSansBengaliMedium absolute right-5" style={{ top: Platform.OS === 'ios' ? 50 : 10}}>v1.1.1</Text>
                <View className="flex items-center justify-between p-5">
                    <Image
                        source={splash}
                        className="h-[400px] mb-14"
                        resizeMode="contain"
                    />
                    {
                        loading ?
                        <ActivityIndicator size="large" color="#00ff00"/> :
                        <View className="flex items-center justify-between">
                            <Text className="text-black text-3xl text-center font-IndopakRegular leading-[70px]">
                                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                            </Text>
                            <Text className="text-sm text-center text-gray-500 mb-3">
                                পরম করুণাময় অসীম দয়ালু আল্লাহতায়ালার নামে
                            </Text>
                            <CustomButton
                                title="শুরু করছি"
                                onPress={() => router.replace("/(root)/(tabs)/home")}
                                className="bg-dark-green px-5 py-2 rounded-lg font-NotoSansBengaliSemiBold border-dark-green w-[275px]"
                                bgVariant="primary"
                                textVariant="secondary"
                                ImgRight={angleRight}
                            />
                        </View>
                    }
                </View>
        </SafeAreaView>
    );
};

export default Splash;