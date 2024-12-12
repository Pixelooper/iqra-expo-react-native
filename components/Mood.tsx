import { router } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { moods } from "@/constants";

const Mood = () => {
  return (
    <View className="w-full px-4 pb-8">
        <Text className="text-lg font-AnekBanglaSemiBold text-gray-700 mt-5 mb-4">
            Moods
        </Text>
        <View
            className="flex flex-row flex-wrap justify-between items-center"
        >
            {moods.map((mood) => (
                <TouchableOpacity
                    key={mood._id}
                    onPress={() => {
                        router.replace("/(public)/surah");
                    }}
                    className={`rounded-lg p-4 justify-between items-center w-[30%] h-48 ${mood.bgClass}`}
                >
                    <Text className="text-xl font-AnekBanglaBold text-center">
                        {mood.icon}
                    </Text>
                    <Text className="text-black text-md pt-2 font-AnekBanglaSemiBold text-center">
                        {mood.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
  );
};

export default Mood;
