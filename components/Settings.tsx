import { router } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { settings } from "@/constants";

const Settings = () => {
  return (
    <View className="w-full px-4">
        <View
            className="flex flex-row flex-wrap mt-4  justify-between items-center"
        >
            {settings.map((option) => (
                <TouchableOpacity
                    key={option._id}
                    onPress={() => {
                        router.replace("/(public)/surah");
                    }}
                    className={`rounded-lg p-4 justify-between items-center w-[30%] h-[130px] ${option.bgClass}`}
                >
                    <Text className={`text-sm font-AnekBanglaBold text-center ${option.textClass}`}>
                        {option.title}
                    </Text>
                    <Text className="text-gray-500 text-xs pt-2 font-AnekBangla text-center">
                        Saved Items
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
  );
};

export default Settings;
