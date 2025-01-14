import { router } from "expo-router";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Title from "./Title";
import shape1 from "../assets/shapes/shape-1.png";
import shape2 from "../assets/shapes/shape-2.png";
import shape3 from "../assets/shapes/shape-3.png";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import { convertToBengaliDigits } from "@/utils/hooks/useBengaliDigit";

const Saved = () => {
    const { surah, ayat, tafsir, lastRead } = useSelector((state: RootState) => state.bookmark);
    // console.log("Saved", surah, ayat, tafsir, lastRead);

    const items = [
        {
            title: 'সূরা',
            total: surah.length,
            url: '/(root)/(tabs)/search',
            img: shape1
        },
        {
            title: 'আয়াত',
            total: ayat.length,
            url: '/(root)/(tabs)/search',
            img: shape2
        },
        {
            title: 'তাফসীর',
            total: tafsir.length,
            url: '/(root)/(tabs)/search',
            img: shape3
        }
    ]

    return (
        <View className="w-full p-4 bg-white">
            <Title title="Saved Items" subtitle="এখানে আপনি সংরক্ষিত আইটেম খুঁজে পেতে পারেন" btnText={false}/>
            <View className="flex flex-row flex-wrap mt-4  justify-between items-center">
            {items.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        router.replace(`/(root)/(tabs)/search`);
                    }}
                    className={`rounded-lg p-3 justify-between items-start w-[31%] h-[120px] border border-gray-white bg-white`}
                >
                    <Image
                    source={item.img}
                    className="w-[40px] h-[40px] absolute right-3 top-3"
                    resizeMode="contain"
                    />
                    <Text className={`text-lg font-AnekBanglaSemiBold text-black`}>
                        {item.title}
                    </Text>
                    <Text className="text-black text-xs pt-2 font-AnekBangla">
                        {convertToBengaliDigits(item.total)}{item.total === 0 ? '' : 'টি'} সংরক্ষিত
                    </Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>
    );
};

export default Saved;
