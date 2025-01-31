import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from './CustomButton';
import tafsir from "../assets/icons/tafsir.png";
import read from "../assets/icons/continue.png";
import bookmark from "../assets/icons/bookmark.png";
import tick from "../assets/icons/tick.png";
import { convertToBengaliDigits } from '@/utils/hooks/useBengaliDigit';
import Toast from 'react-native-toast-message';
import { addAyat, addTafsir, setContinueReading } from '@/utils/store/slices/bookmarkSlice';
import { useDispatch } from 'react-redux';

type SingleAyatProps = {
    no: number;
    sid: string;
    aid: string;
    ar: string;
    bn: string;
    tafsirPage: boolean;
    shanenuzul: string;
    tika: string[];
    quote: string;
};

const SingleAyat = ({ no, sid, aid, ar, bn, tafsirPage, shanenuzul, tika, quote }: SingleAyatProps) => {
    const dispatch = useDispatch();
    const [expandedAyat, setExpandedAyat] = useState(null);

    const toggleExpand = (ayatNo: number) => {
        setExpandedAyat(expandedAyat === ayatNo ? null : ayatNo);
    };

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

    const handleContinueReading = (sId: string, aId: string) => {
        dispatch(setContinueReading({ sId, aId }));
    
        Toast.show({
            type: "success",
            text1: "Saved for later!",
            text2: "আপনি পরে পড়া চালিয়ে যেতে পারেন।",
        });
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
                        <TouchableOpacity onPress={() => handleContinueReading(sid, aid)}>
                            <Image
                                source={read}
                                className="w-[24px] h-[24px] "
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    }
                    {
                        !tafsirPage &&
                        <CustomButton
                            title="তাফসীর"
                            onPress={() => {router.push(`/tafsir/${sid}/${aid}`)}} 
                            // onPress={() => pathPush(pathname, `/tafsir/${sid}/${aid}`)}
                            className="rounded-2xl py-1 px-1 h-5 w-[68px] border-gray-white"
                            ImgLeft={tafsir}
                            bgVariant="secondary"
                        />
                    }
                    <CustomButton
                        title="সংরক্ষণ"
                        className="rounded-2xl py-1 px-1 h-5 w-[68px] border-gray-white"
                        ImgLeft={bookmark}
                        onPress={() => handleAyatOrTafsirSave(sid, aid)}
                        bgVariant="secondary"
                    />
                    {
                        tafsirPage || (!quote && !shanenuzul && tika.length === 0) ? null : 
                        <CustomButton
                            title="তথ্য"
                            className="rounded-2xl py-1 px-1 h-5 w-[46px] border-gray-white"
                            ImgLeft={tick}
                            onPress={() => toggleExpand(no)}
                            bgVariant="secondary"
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

                {
                    expandedAyat === no && (
                        <>
                            {
                                shanenuzul &&
                                <Text className="font-AnekBangla text-sm text-black-300 mt-3">
                                    <Text className="font-AnekBanglaSemiBold text-yellow-400">শানে নুযূল: </Text>  
                                    {shanenuzul}
                                </Text>
                            }
                            {
                                tika.length > 0 &&
                                tika.map((text, index) => (
                                    <Text key={index} className="font-AnekBangla text-sm text-black-300 mt-3">
                                        <Text className="font-AnekBanglaSemiBold text-yellow-400">টিকা ({index+1}): </Text>  
                                        {text}
                                    </Text>
                                ))
                            }
                            {
                                quote &&
                                <Text className="font-AnekBangla text-sm text-black-300 mt-3">
                                    <Text className="font-AnekBanglaSemiBold text-yellow-400">লেখকের কথা: </Text>  
                                    {quote}
                                </Text>
                            }
                        </>
                    )
                }
            </View>
        </View>
    );
};

export default SingleAyat;