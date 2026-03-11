import { ActivityIndicator, Animated, Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { surah } from "@/types/type";
import Title from "@/components/Title";
import { convertToBengaliDigits } from "@/utils/hooks/useBengaliDigit";
import useAssignShapes from "@/utils/hooks/useAssignShapes";
import minus from "../assets/icons/delete.png";
import EmptyData from "./EmptyData";

const SPACING = 20;
const AVATAR_SIZE = 100;
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

type BookedItemProps = {
    loading: boolean;
    surahData: surah[];
    onDeleteSurah?: (surahId: number) => Promise<void>;
};

const BookedItem: React.FC<BookedItemProps> = ({loading, surahData, onDeleteSurah}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [deletingIds, setDeletingIds] = useState<number[]>([]);
    const scrollY = useRef(new Animated.Value(0)).current;

    const filteredSurahs = !surahData ? [] : surahData.filter((surah: surah) =>
      surah.name_bn.includes(searchQuery) || surah.name_en.includes(searchQuery) || surah.name_en.toUpperCase().includes(searchQuery) || surah.name_en.toLowerCase().includes(searchQuery) || surah.name_ar.includes(searchQuery)
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

    const handleDelete = async (surahId: number, surahName: string) => {
      try {
          setDeletingIds(prev => [...prev, surahId]);
          
          if (onDeleteSurah) {
              await onDeleteSurah(surahId);
          }
          
          // No need to update local state here as parent will pass new surahData
          
      } catch (error) {
          console.error("Error in delete:", error);
      } finally {
          setDeletingIds(prev => prev.filter(id => id !== surahId));
      }
    };
    
    const surahWithShapes = useAssignShapes(filteredSurahs);
    const surahReversed = [...surahWithShapes].reverse(); // avoid mutating

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
                  <Title title="সংরক্ষিত সূরা তালিকা" subtitle="এখানে আপনি আপনার সংরক্ষিত সূরাটি খুঁজে পেতে পারেন" btnText={false} />
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
                data={surahReversed}
                contentContainerStyle={{ paddingTop: 16 }}
                // keyExtractor={(item) => item._id}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                  const isDeleting = deletingIds.includes(item._id);

                  return (
                    <TouchableOpacity key={index} 
                      onPress={() => {router.push(`/(root)/(tabs)/surah/${item._id}`)}} 
                    >
                      <Animated.View className="w-full mr-3 border border-gray-white bg-white rounded-lg p-2 flex flex-row items-center justify-start"
                        style={{
                          marginBottom: SPACING,
                          borderRadius: 12,
                          opacity: isDeleting ? 0.5 : 1,
                        }}
                      >
                        <View className="relative flex items-start justify-between pl-3">
                        {/* <Image
                          source={item.shape}
                          className={`w-[${AVATAR_SIZE}px] h-[${AVATAR_SIZE}px]`}
                          resizeMode="contain"
                        /> */}
                          <Image
                            source={item.shape}
                            style={{
                              width: AVATAR_SIZE,
                              height: AVATAR_SIZE,
                              position: 'absolute',
                              right: 6,
                              top: 8,
                              resizeMode: 'contain'
                            }}
                            className="z-0"
                          />
                          <Text className="text-lg leading-/ text-black font-NotoSansBengaliSemiBold mb-1">
                            সূরা {item.name_bn}
                          </Text>
                          <Text className="text-sm leading-6 text-black mb-4">
                            সর্বমোট আয়াত {convertToBengaliDigits(item.totalAyat)}
                          </Text>
                            <View className="flex flex-row items-center justify-between w-full">
                              <View className="flex flex-row items-center justify-between">
                                <View className="flex items-center justify-between border border-gray-white px-3 py-1 rounded-md mr-1">
                                  <Text className="text-sm leading-6 text-black font-NotoSansBengaliSemiBold">
                                    {convertToBengaliDigits(item.no)}
                                  </Text>
                                </View>
                              
                                {/* Delete Button */}
                                <TouchableOpacity
                                  onPress={() => handleDelete(item._id, item.name_bn)}
                                  disabled={isDeleting}
                                  className="p-2"
                                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                  {isDeleting ? (
                                    <ActivityIndicator size="small" color="#FF3B30" />
                                  ) : (
                                    <Image
                                      source={minus}
                                      tintColor="#686767"
                                      resizeMode="contain"
                                      className="w-6 h-6"
                                    />
                                  )}
                                </TouchableOpacity>
                              </View>
                              <Text className="text-2xl text-black text-right pr-1 font-IndopakRegular leading-[55px]">
                                {item.name_ar}
                              </Text>
                            </View>
                        </View>
                      </Animated.View>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={() => (
                 <EmptyData/>
                )}
              />
            </View>
          )}
        </AnimatedSafeAreaView>
    );
};

export default BookedItem;