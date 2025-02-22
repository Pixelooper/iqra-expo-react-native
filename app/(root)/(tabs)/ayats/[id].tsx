import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalSearchParams } from 'expo-router';
import { Animated, View, TextInput, ActivityIndicator, Text, Platform } from 'react-native';
import { useScrollToAyat } from '@/utils/hooks/useScrollToAyat';
import { updateLastRead } from '@/utils/store/slices/bookmarkSlice';
import { FlashList } from '@shopify/flash-list';
import { useSurahData } from '@/utils/hooks/useSurahData';
import { SafeAreaView } from 'react-native-safe-area-context';
import SurahHead from '@/components/SurahHead';
import { AyatList } from '@/components/AyatList';
import { convertToBengaliDigits, convertToEnglishDigits } from '@/utils/hooks/useBengaliDigit';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const Ayats = () => {
  const dispatch = useDispatch();
  const { id, scrollTo } = useLocalSearchParams<{ id: string; scrollTo?: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const flashListRef = useRef<FlashList<any>>(null);

  const translateY = useRef(new Animated.Value(0)).current;
  const containerHeight = useRef(new Animated.Value(100)).current;

  // Data handling
  const { data: surahData, loading, error } = useSurahData(id);
  const filteredAyats = surahData?.ayat?.filter((ayat) => {
    const banglaNumber = convertToBengaliDigits(searchQuery); // Convert input to Bangla digits
    const englishNumber = convertToEnglishDigits(searchQuery); // Convert Bangla input to English digits

    const isNumberSearch = !isNaN(englishNumber); // Check if input (after conversion) is a valid number

    return (
        ayat.bn.includes(searchQuery) || 
        ayat.ar.includes(searchQuery) || 
        (isNumberSearch && ayat.no.toString().includes(englishNumber)) || // Match with English numbers
        (isNumberSearch && ayat.no.toString().includes(banglaNumber)) // Match with Bangla numbers
    );
}) || [];




  // Scroll handling
  useScrollToAyat({
    flashListRef,
    ayatId: scrollTo,
    data: filteredAyats,
    loading,
  });

  // Update last read
  useEffect(() => {
    dispatch(updateLastRead(id));
  }, [dispatch, id]);

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

    const handleFocus = () => {
        Animated.parallel([
        Animated.timing(translateY, {
            toValue: -100, // Move the title up
            duration: 300,
            useNativeDriver: true,
        }),
        Animated.timing(containerHeight, {
            toValue: 0, // Collapse the container height
            duration: 300,
            useNativeDriver: false, // Height cannot use native driver
        }),
        ]).start();
    };

    const handleBlur = () => {
        Animated.parallel([
        Animated.timing(translateY, {
            toValue: 0, // Reset the title position
            duration: 300,
            useNativeDriver: true,
        }),
        Animated.timing(containerHeight, {
            toValue: 100, // Reset the container height
            duration: 300,
            useNativeDriver: false,
        }),
        ]).start();
    };

    return (
    <AnimatedSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, paddingHorizontal: 16, marginTop: Platform.OS === 'ios' ? 0 : 60 }}>
        <Animated.View style={{ height: containerHeight, overflow: 'hidden' }}>
          <Animated.View style={{ transform: [{ translateY }] }}>
                <View>
                  <SurahHead
                    ar={surahData?.name_ar}
                    bn={surahData?.name_bn}
                    total={surahData?.totalAyat}
                    tafsir={false}
                  />
                </View>
          </Animated.View>
        </Animated.View>

        {/* Search input */}
        <TextInput
          placeholder="এখানে লিখুন"
          placeholderTextColor="#7B7B8B"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full px-3 border border-gray-black rounded-md text-gray-black mt-3 py-1 bg-white font-AnekBangla text-sm leading-6"
        />

        {/* Ayat list */}
        <View className="mt-2 px-4 pt-4 text-dark-greem  border border-gray-white bg-white rounded-3xl" style={{ 
            flex: 1,
            minHeight: 200,
            backgroundColor: 'transparent' 
        }}>
          <AyatList
              sid={id}
              data={filteredAyats}
              flashListRef={flashListRef}
              tafsirPage={false}
          />
        </View>
      </View>
    </AnimatedSafeAreaView>
  );
};

export default Ayats;