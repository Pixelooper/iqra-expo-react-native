import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const RandomAyat = () => {
    return (
        <View className="bg-dark-green rounded-b-3xl p-6 text-white pt-32">
            <Text className="text-2xl font-AnekBanglaSemiBold mb-8 text-right text-white">الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ</Text>
            <Text className="text-md font-AnekBanglaSemiBold mb-1 text-left text-white">যিনি পরম করুণাময়, অসীম দয়ালু।</Text>
            <View className="flex flex-row justify-between">
                <Text className="text-sm text-gray-300 text-left font-AnekBangla">- আল ফাতিহা ২/৭</Text>
                <TouchableOpacity onPress={() => {router.replace("/(root)/(tabs)/search")}}>
                    <Text className="text-black text-md font-AnekBanglaBold">👉</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RandomAyat;