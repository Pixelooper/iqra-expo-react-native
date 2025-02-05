import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import shape from "../assets/shapes/shape-6.png";
import EmptyData from './EmptyData';

type BasedOnProps = {
    basedon: [
        {
            _id: string;
            topic: string;
        }
    ]
};

const BasedOnList: React.FC<BasedOnProps> = ({basedon}) => {
    return (
        <View className="pt-4">
            {
            basedon.length === 0 ?
                <EmptyData/> 
            :
            basedon.map((item) => (
            <TouchableOpacity 
                key={item._id} 
                onPress={() => router.push(`/(root)/(tabs)/basedon/${item._id}`)}
                className="py-2 px-4 border border-gray-white bg-white rounded-lg mb-3"
            >
                <View className="w-full flex flex-row justify-start items-center">
                    <Image
                        source={shape}
                        className="w-[16px] h-[16px]"
                        resizeMode="contain"
                    />
                    <Text className="text-sm leading-6 text-gray-black font-AnekBanglaSemiBold ml-2">
                        {item.topic}
                    </Text>
                </View>
            </TouchableOpacity>
            ))}
        </View>
    );
};

export default BasedOnList;