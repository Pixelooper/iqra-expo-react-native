import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { Image, Text, View, ActivityIndicator } from "react-native";
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
                            <Text className="text-black text-3xl text-center">
                                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                            </Text>
                            <Text className="text-sm font-AnekBangla text-center text-gray-500 my-3">
                                পরম করুণাময় অসীম দয়ালু আল্লাহতায়ালার নামে
                            </Text>
                            <CustomButton
                                title="শুরু করছি"
                                onPress={() => router.replace("/(root)/(tabs)/home")}
                                className="rounded-lg py-3 px-3 h-12 w-[275px] border-dark-green"
                                bgVariant="primary"
                                textVariant="primary"
                                ImgRight={angleRight}
                            />
                        </View>
                    }
                </View>
        </SafeAreaView>
    );
};

export default Splash;