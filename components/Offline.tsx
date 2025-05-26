import { Text } from "react-native";
import { Image, View } from "react-native";
import { images } from "@/constants" ;
import CustomButton from "./CustomButton";

type OfflineProps = {
  connect: () => void;
};

const Offline: React.FC<OfflineProps> = ({ connect }) => {
    return (
        <View className="flex items-center justify-center mt-10">
            <Image 
                source={images.disconnect} 
                style={{ width: 200, height: 200, resizeMode: 'contain' }}
            />
            <Text className="text-gray-500 text-lg leading-8 mt-4 font-NotoSansBengali">
                No Internet Connection
            </Text>
            <Text className="text-gray-500 text-sm leading-8 mb-2 font-NotoSansBengali">
                Please TURN ON your mobile data / wifi and reload.
            </Text>
            <CustomButton
                title="Reload"
                className="rounded-2xl px-1 h-8 w-32 border-gray-white"
                onPress={() => {
                    connect();
                }}
                bgVariant="secondary"
            />
        </View>
    );
};

export default Offline;