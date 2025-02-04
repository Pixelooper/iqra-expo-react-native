import { Text } from "react-native";
import { Image, View } from "react-native";
import { images } from "@/constants" ;

const EmptyData = () => {
    return (
        <View className="flex items-center justify-center mt-10">
            <Image 
                source={images.noResult} 
                style={{ width: 200, height: 200, resizeMode: 'contain' }}
            />
            <Text className="text-gray-500 text-lg mt-4 font-AnekBangla">
                কোনো তথ্য পাওয়া যায়নি
            </Text>
        </View>
    );
};

export default EmptyData;