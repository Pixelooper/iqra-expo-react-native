import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalSearchParams } from 'expo-router';
import { Animated, View, TextInput, ActivityIndicator, Text, Platform } from 'react-native';
import { useScrollToAyat } from '@/utils/hooks/useScrollToAyat';
import { updateLastRead } from '@/utils/store/slices/bookmarkSlice';
import { FlashList } from '@shopify/flash-list';
import { useSurahData } from '@/utils/hooks/useSurahData';
import { SafeAreaView } from 'react-native-safe-area-context';
import SurahHead from '@/components/SurahHead';
import { AyatList } from '@/components/AyatList';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const Ayat = () => {
  const dispatch = useDispatch();
  const { id, scrollTo } = useLocalSearchParams<{ id: string; scrollTo?: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const flashListRef = useRef<FlashList<any>>(null);

  const translateY = useRef(new Animated.Value(0)).current;
  const containerHeight = useRef(new Animated.Value(100)).current; // Adjust the default height as needed

  // Data handling
  const { data: surahData, loading, error } = useSurahData(id);
  const filteredAyats = surahData?.ayat?.filter((ayat) => 
    ayat.bn.includes(searchQuery) || ayat.ar.includes(searchQuery)
  ) || [];

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

  // Animation code (keep your existing animation logic here)
  // ...

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
      <View style={{ flex: 1, paddingHorizontal: 16, marginTop: Platform.OS === 'ios' ? 0 : 35 }}>
        {/* Animated header */}
        <Animated.View style={{ height: containerHeight, overflow: 'hidden' }}>
          <Animated.View style={{ transform: [{ translateY }], paddingTop: 10 }}>
            <SurahHead
              ar={surahData?.name_ar}
              bn={surahData?.name_bn}
              total={surahData?.totalAyat}
              tafsir={false}
            />
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
          className="w-full px-4 border border-gray-black rounded-md text-gray-black mt-3 py-2 bg-white"
        />

        {/* Ayat list */}
        <AyatList
            sid={id}
            data={filteredAyats}
            flashListRef={flashListRef}
        />
      </View>
    </AnimatedSafeAreaView>
  );
};

export default Ayat;