import { ayat } from "@/types/type";
import { convertToBengaliDigits } from "@/utils/hooks/useBengaliDigit";
import { router } from "expo-router";
import { Image, Platform, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import shape from "../assets/shapes/shape-11.png";
import Title from "./Title";

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
        <View className="w-full bg-white mt-20">
            <Text className="mx-3 text-lg font-AnekBanglaMedium text-black text-left mb-2">
                আজকের আয়াত
            </Text>
            <View className={`mx-3 p-4 border border-gray-white rounded-3xl ${paddingTop}`}>
                <Image
                    source={shape}
                    className="w-[130px] h-[130px] absolute left-3 top-3"
                    resizeMode="contain"
                />
                <Text className="text-2xl my-4 text-right text-black pt-4">{random?.ar}</Text>
                <Text className="font-AnekBanglaMedium mb-1 text-left text-black text-lg leading-7">{random?.bn}</Text>
                <View className="flex flex-row justify-between">
                    <Text className=" text-black text-left font-AnekBangla text-xs leading-5">- সূরা: {random?.surahName_bn} {convertToBengaliDigits(random?.surahNo)} / {convertToBengaliDigits(random?.no)}</Text>
                    <CustomButton
                        title="পড়ুন"
                        onPress={() => router.push(`/ayats/${random?.surahId}`)}
                        className="rounded-sm px-2 w-[62px] border-dark-green"
                        bgVariant="secondary"
                    />
                </View>
            </View>
        </View>
    );
};

export default RandomAyat;