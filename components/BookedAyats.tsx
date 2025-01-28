import { ActivityIndicator, Animated, Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { ayat } from "@/types/type";
import Title from "@/components/Title";
import { convertToBengaliDigits } from "@/utils/hooks/useBengaliDigit";
import useAssignShapes from "@/utils/hooks/useAssignShapes";

const SPACING = 20;
const AVATAR_SIZE = 100;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 2;
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

type BookedAyatsProps = {
    loading: boolean;
    ayatData: ayat & {
        surahId: string;
        surahNo: number;
        surahName_bn: string;
    };
};

const BookedAyats: React.FC<BookedAyatsProps> = ({loading, ayatData}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const scrollY = useRef(new Animated.Value(0)).current;

    const filteredSurahs = !ayatData ? [] : ayatData.filter((ayat: ayat) =>
      ayat.bn.includes(searchQuery) || ayat.ar.includes(searchQuery)
    );

    const translateY = useRef(new Animated.Value(0)).current;
    const containerHeight = useRef(new Animated.Value(60)).current; // Adjust the default height as needed
  
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
          toValue: 60, // Reset the container height
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    };
    
    const surahWithShapes = useAssignShapes(filteredSurahs);

    return (
        <AnimatedSafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          {loading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          ) : (
            <View style={{ flex: 1, paddingHorizontal: 16, marginTop: Platform.OS === 'ios' ? 0 : 35 }}>
              <Animated.View
                style={{
                  height: containerHeight, // Animates the container height
                  overflow: "hidden", // Prevents overflow content from being visible
                }}
              >
                <Animated.View
                  style={{
                    transform: [{ translateY }],
                    opacity: translateY.interpolate({
                      inputRange: [-100, 0],
                      outputRange: [0, 1],
                      extrapolate: "clamp",
                    }),
                  }}
                >
                  <Title title="সংরক্ষিত আয়াত তালিকা" subtitle="এখানে আপনি আপনার সংরক্ষিত আয়াতটি খুঁজে পেতে পারেন" btnText={false} />
                </Animated.View>
              </Animated.View>
              <TextInput
                placeholder="এখানে লিখুন"
                placeholderTextColor="#7B7B8B"
                value={searchQuery}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={(text) => setSearchQuery(text)}
                className="w-full px-4 border border-gray-black rounded-md text-gray-black mt-3 py-2 bg-white"
              />
              <Animated.FlatList
                data={surahWithShapes}
                contentContainerStyle={{ paddingTop: 16 }}
                // keyExtractor={(item) => item._id}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                  const inputRange = [
                    -1,
                    0,
                    ITEM_SIZE * index,
                    ITEM_SIZE * (index + 1), // Correct scaling range
                  ];
    
                  const scaleInputRange = [
                    -1,
                    0,
                    ITEM_SIZE * index,
                    ITEM_SIZE * (index + 0.5), // Visible scaling happens earlier
                  ];
    
                  const opacity = scrollY.interpolate({
                    inputRange,
                    outputRange: [1, 1, 1, 0],
                  });
    
                  const scale = scrollY.interpolate({
                    inputRange: scaleInputRange,
                    outputRange: [1, 1, 1, 0.8],
                  });
    
                  return (
                    <TouchableOpacity key={index} 
                      onPress={() => router.push(`/(root)/(tabs)/ayat/${item?.surahId}`)}
                    >
                      <Animated.View className="w-full mr-3 border border-gray-white bg-white rounded-lg p-2 flex flex-row items-center justify-start"
                        style={{
                          marginBottom: SPACING,
                          borderRadius: 12,
                          transform: [{ scale }],
                          opacity,
                        }}
                      >
                        <Image
                          source={item.shape}
                          className={`w-[${AVATAR_SIZE}px] h-[${AVATAR_SIZE}px]`}
                          resizeMode="contain"
                        />
                        <View className="flex-1 flex items-end justify-between pl-3 min-h-[95px]">
                            <Text className="text-xs text-black mb-2">
                                {item.ar.slice(0, 75)}...
                            </Text>
                            <Text className="text-xs text-black font-AnekBanglaSemiBold mb-4">
                                {item.bn.slice(0, 75)}...
                            </Text>
                            <View className="flex flex-row items-center justify-between w-full">
                                <View className="flex items-center justify-between border border-gray-white px-3 py-1 rounded-md">
                                    <Text className="text-xs text-black font-AnekBanglaSemiBold">
                                    সূরা {item.surahName_bn}
                                    </Text>
                                </View>
                                <Text className="text-xs text-black text-right pr-1">
                                    আয়াত নম্বর {convertToBengaliDigits(item.no)}
                                </Text>
                          </View>
                        </View>
                      </Animated.View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
        </AnimatedSafeAreaView>
    );
};

export default BookedAyats;