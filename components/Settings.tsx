import { router } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";

const Settings = () => {
  return (
    <View className="w-full px-4 mt-4">
        <View
            className="flex flex-row flex-wrap mt-4  justify-between items-center"
        >
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(root)/(tabs)/search");
                }}
                className={`rounded-lg p-4 justify-between items-center w-[30%] h-[130px] border border-[#393939] bg-[#252531]`}
            >
                <Text className={`text-sm font-AnekBanglaSemiBold text-center text-gray-200`}>
                    Surah
                </Text>
                <Text className="text-gray-200 text-xs pt-2 font-AnekBangla text-center">
                    Saved Items
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(root)/(tabs)/search");
                }}
                className={`rounded-lg p-4 justify-between items-center w-[30%] h-[130px] border border-[#393939] bg-[#252531]`}
            >
                <Text className={`text-sm font-AnekBanglaSemiBold text-center text-gray-200`}>
                    Ayat
                </Text>
                <Text className="text-gray-200 text-xs pt-2 font-AnekBangla text-center">
                    Saved Items
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(root)/(tabs)/search");
                }}
                className={`rounded-lg p-4 justify-between items-center w-[30%] h-[130px] border border-[#393939] bg-[#252531]`}
            >
                <Text className={`text-sm font-AnekBanglaSemiBold text-center text-gray-200`}>
                    Tafsir
                </Text>
                <Text className="text-gray-200 text-xs pt-2 font-AnekBangla text-center">
                    Saved Items
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default Settings;
