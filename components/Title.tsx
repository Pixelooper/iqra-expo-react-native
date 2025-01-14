import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

type TitleProps = {
    title: string;
    subtitle: string;
    btnText: string
};

const Title: React.FC<TitleProps> = ({ title, subtitle, btnText }) => {
    return (
        <View className='mt-4'>
            <View className='flex flex-row justify-between'>
                <Text className="text-lg font-AnekBanglaMedium text-dark-green">
                    {title}
                </Text>
                {
                    btnText &&
                    <CustomButton
                        title={btnText}
                        onPress={() => router.replace("/(root)/(tabs)/home")}
                        className="rounded-sm py-1 px-2 h-5 w-[74px] border-dark-green"
                    />
                }
            </View>
            <Text className="leading-5 font-AnekBangla text-black">
                {subtitle}
            </Text>
        </View>
    );
};

export default Title;