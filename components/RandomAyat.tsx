import { ayat } from "@/types/type";
import { convertToBengaliDigits } from "@/utils/hooks/useBengaliDigit";
import { router } from "expo-router";
import { Image, Platform, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import shape from "../assets/shapes/shape-11.png";

type RandomProps = {
    random: ayat & {
        surahId: string;
        surahNo: number;
        surahName_bn: string;
    };
};

const paddingTop = Platform.select({
    ios: 'pt-4',
    android: 'pt-4',
    default: 'pt-4',
});


const RandomAyat: React.FC<RandomProps> = ({ random }) => {
    return (
        <View className={`bg-white mx-3 mt-20 p-4 border border-gray-white rounded-3xl pb-4 ${paddingTop}`}>
            <Image
                source={shape}
                className="w-[130px] h-[130px] absolute left-3 top-3"
                resizeMode="contain"
            />
            
            <Text className={`text-lg font-AnekBanglaMedium text-dark-green text-right`}>
                AYAT OF THE DAY!
            </Text>
            <Text className="text-xl my-4 text-right text-black">{random?.ar}</Text>
            <Text className="font-AnekBanglaMedium mb-1 text-left text-black">{random?.bn}</Text>
            <View className="flex flex-row justify-between">
                <Text className=" text-black text-left font-AnekBangla">- সূরা: {random?.surahName_bn} {convertToBengaliDigits(random?.surahNo)} / {convertToBengaliDigits(random?.no)}</Text>
                <CustomButton
                    title="পড়ুন"
                    onPress={() => router.push(`/ayat/${random?.surahId}`)}
                    className="rounded-sm py-1 px-2 h-5 w-[56px] border-dark-green"
                />
            </View>
        </View>
    );
};

export default RandomAyat;