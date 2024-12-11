import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { Image, Text, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "@/assets/images/icon.png";
import bg from "@/assets/images/pattern.png";

const Splash = () => {
    return (
        <SafeAreaView>
            <ImageBackground source={bg} resizeMode="repeat" className="min-h-screen flex justify-center bg-light-olive">
                <View className="flex h-4/6 items-center justify-between p-5">
                    <Image
                        source={logo}
                        className="h-[200px]"
                        resizeMode="contain"
                    />
                    <View className="flex items-center justify-between">
                        <Text className="text-black text-lg font-AnekBanglaSemiBold text-center">
                            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                        </Text>
                        <Text className="text-sm font-AnekBangla text-center text-gray-500 mt-3">
                            পরম করুণাময় অসীম দয়ালু আল্লাহতায়ালার নামে
                        </Text>
                        <CustomButton
                            title="শুরু করছি"
                            onPress={() => router.replace("/(public)/home")}
                            className="mt-8"
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Splash;