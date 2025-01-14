import { router } from "expo-router";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Title from "./Title";
import shape from "../assets/shapes/shape-7.png";

const Mood = () => {
  return (
    <View className="w-full px-4 pb-8 bg-white">
        <Title title="Moods" subtitle="আপনার মেজাজের উপর ভিত্তি করে পড়ুন" btnText={false}/>
        <View className="flex flex-row flex-wrap justify-between items-center pt-4 mb-16">
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(root)/(tabs)/search");
                }}
                className={`rounded-lg p-4 justify-between items-center w-[31%] h-44 border border-gray-white bg-white`}
            >
                <Image
                    source={shape}
                    className="w-[84px] h-[84px] absolute left-2 bottom-2"
                    resizeMode="contain"
                />
                <Text className="text-xl font-AnekBanglaBold text-center">
                    🌞
                </Text>
                <Text className="text-black text-md pt-2 font-AnekBanglaSemiBold text-center">
                    Happiness
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(root)/(tabs)/search");
                }}
                className={`rounded-lg p-4 justify-between items-center w-[31%] h-44 border border-gray-white bg-white`}
            >
                <Image
                    source={shape}
                    className="w-[84px] h-[84px] absolute left-2 bottom-2"
                    resizeMode="contain"
                />
                <Text className="text-xl font-AnekBanglaBold text-center">
                    🌙
                </Text>
                <Text className="text-black text-md pt-2 font-AnekBanglaSemiBold text-center">
                    Sadness
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(root)/(tabs)/search");
                }}
                className={`rounded-lg p-4 justify-between items-center w-[31%] h-44 border border-gray-white bg-white`}
            >
                <Image
                    source={shape}
                    className="w-[84px] h-[84px] absolute left-2 bottom-2"
                    resizeMode="contain"
                />
                <Text className="text-xl font-AnekBanglaBold text-center">
                    🔥
                </Text>
                <Text className="text-black text-md pt-2 font-AnekBanglaSemiBold text-center">
                    Anger
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default Mood;
