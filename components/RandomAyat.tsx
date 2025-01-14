import { ayat } from "@/types/type";
import { convertToBengaliDigits } from "@/utils/hooks/useBengaliDigit";
import { router } from "expo-router";
import { Platform, Text, TouchableOpacity, View } from "react-native";

type RandomProps = {
    random: ayat & {
        surahNo: number;
        surahName_bn: string;
    };
};

const paddingTop = Platform.select({
    ios: 'pt-24',
    android: 'pt-24',
    default: 'pt-24',
});


const RandomAyat: React.FC<RandomProps> = ({ random }) => {
    return (
        <View className={`bg-white p-4 ${paddingTop}`}>
            <Text className="text-xl mb-4 text-right text-black">{random.ar}</Text>
            <Text className="font-AnekBangla mb-1 text-left text-black">{random.bn}</Text>
            <View className="flex flex-row justify-between">
                <Text className=" text-black text-left font-AnekBangla">- সূরা: {random.surahName_bn} {convertToBengaliDigits(random.surahNo)} / {convertToBengaliDigits(random.no)}</Text>
                <TouchableOpacity onPress={() => {router.replace("/(root)/(tabs)/search")}}>
                    <Text className="text-black text-md font-AnekBanglaBold">👉</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RandomAyat;