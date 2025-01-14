import { Image, Text, View } from 'react-native';
import shape from "../assets/shapes/shape-2.png";
import { convertToBengaliDigits } from '@/utils/hooks/useBengaliDigit';

type TitleProps = {
    ar: string;
    bn: string;
    total: number,
    tafsir: boolean;
};

const SurahHead = ({ ar, bn, total, tafsir } : TitleProps) => {
    return (
        <View className="pb-4">
            <Image
                source={shape}
                className="w-[100px] h-[100px] absolute right-0 bottom-3"
                resizeMode="contain"
            />
            <Text className="text-center text-3xl text-green-950 mb-2">
                سورة {ar}
            </Text>
            <Text className="text-center text-lg font-AnekBanglaMedium gray-black mb-1">
                সূরা {bn}
            </Text>
            {tafsir ? 
                <Text className="text-center text-sm text-gray-600">
                    তাফসীর ইবনে কাসীর
                </Text> :
                <Text className="text-center text-sm text-gray-black font-AnekBanglaMedium">
                    আয়াত সংখ্যা {convertToBengaliDigits(total)}
                </Text>
            }
        </View>
    );
};

export default SurahHead;