import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

type TitleProps = {
    title: string;
    subtitle: string;
    btnText: string;
    btnUrl?: string;
};

const Title: React.FC<TitleProps> = ({ title, subtitle, btnText, btnUrl }) => {
    return (
        <View className='mt-4'>
            <View className='flex flex-row justify-between'>
                <Text className="text-lg font-AnekBanglaBold text-[#B6B6B6]">
                    {title}
                </Text>
                {
                    btnText &&
                    <CustomButton
                        title={btnText}
                        onPress={() => router.replace(btnUrl)}
                        className="rounded-sm px-2 w-[74px] border-dark-green"
                        bgVariant='secondary'
                    />
                }
            </View>
            <Text className="text-sm leading-6 font-AnekBangla text-black">
                {subtitle}
            </Text>
        </View>
    );
};

export default Title;