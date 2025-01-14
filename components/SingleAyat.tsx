import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from './CustomButton';
import tafsir from "../assets/icons/tafsir.png";
import bookmark from "../assets/icons/bookmark.png";
import tick from "../assets/icons/tick.png";
import { convertToBengaliDigits } from '@/utils/hooks/useBengaliDigit';
import Toast from 'react-native-toast-message';
import { addAyat, addTafsir } from '@/utils/store/slices/bookmarkSlice';
import { useDispatch } from 'react-redux';

type SingleAyatProps = {
    no: number;
    sid: number;
    aid: number;
    ar: string;
    bn: string;
    tafsirPage: boolean;
};

const SingleAyat = ({ no, sid, aid, ar, bn, tafsirPage }: SingleAyatProps) => {
    const dispatch = useDispatch();
    const handleAyatOrTafsirSave = (sId: string, aId: string) => {
        if(tafsirPage){
            dispatch(addTafsir({ sId, aId }));
    
            Toast.show({
              type: "success",
              text1: "Item Saved!",
              text2: "আপনার তাফসীরটি সফলভাবে সংরক্ষণ করা হয়েছে।",
            });
        }else{
            dispatch(addAyat({ sId, aId }));
    
            Toast.show({
              type: "success",
              text1: "Item Saved!",
              text2: "আপনার আয়াতটি সফলভাবে সংরক্ষণ করা হয়েছে।",
            });
        }
    };

    return (
        <View className="mb-4">
            <View className="flex flex-row justify-between mb-4">
                <Text className="text-lg font-AnekBanglaSemiBold text-yellow-400 mb-2">
                    {convertToBengaliDigits(no)}
                </Text>
                <View className="flex flex-row justify-between gap-2">
                    {
                        !tafsirPage &&
                        <CustomButton
                            title="তাফসীর"
                            onPress={() => router.push(`/tafsir/${sid}/${aid}`)}
                            className="rounded-2xl py-1 px-1 h-5 w-[68px] border-gray-white"
                            ImgLeft={tafsir}
                        />
                    }
                    <CustomButton
                        title="সংরক্ষণ"
                        className="rounded-2xl py-1 px-1 h-5 w-[68px] border-gray-white"
                        ImgLeft={bookmark}
                        onPress={() => handleAyatOrTafsirSave(sid, aid)}
                    />
                    {
                        !tafsirPage &&
                        <CustomButton
                            title="তথ্য"
                            className="rounded-2xl py-1 px-1 h-5 w-[46px] border-gray-white"
                            ImgLeft={tick}
                        />
                    }
                </View>
            </View>
            <View className="border-b border-gray-white pb-4">
                <Text className="text-2xl text-black mb-6 text-right">
                    {ar}
                </Text>
                <Text className="text-sm text-black mb-2 font-AnekBangla">
                    {bn}
                </Text>
            </View>
        </View>
    );
};

export default SingleAyat;