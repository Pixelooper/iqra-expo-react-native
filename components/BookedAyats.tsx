import { ActivityIndicator, Animated, Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { ayat } from "@/types/type";
import { convertToBengaliDigits } from "@/utils/hooks/useBengaliDigit";
import useAssignShapes from "@/utils/hooks/useAssignShapes";
import EmptyData from "./EmptyData";

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

type BookedAyatsProps = {
    loading: boolean;
    ayatData: ayat & {
        surahId: string;
        surahNo: number;
        surahName_bn: string;
    };
    Component: React.ElementType;
};

const BookedAyats: React.FC<BookedAyatsProps> = ({loading, ayatData, Component}) => {
    const [searchQuery, setSearchQuery] = useState("");

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
            <View style={{ flex: 1, paddingHorizontal: 16, marginTop: Platform.OS === 'ios' ? 0 : 35, marginBottom: Platform.OS === 'ios' ? 12 : 50 }}>
              <Animated.View
                style={{
                  height: containerHeight, // Animates the container height
                }}
              >
                <View>
                  <Component />
                </View>
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
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 64 }}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity 
                      key={index} 
                      onPress={() => router.push(`/(root)/(tabs)/ayat/${item?.surahId}/${item?._id}`)}
                    >
                      <View 
                        className="w-full border border-gray-white bg-white rounded-lg p-2 flex flex-row items-start justify-start"
                        style={{
                          marginBottom: 20,
                          borderRadius: 12,
                        }}
                      >
                        <View className="flex-1 min-h-[95px]">
                          <View className="flex-1 flex flex-row items-center justify-between">
                            <Image
                              source={item.shape}
                              className="w-[24px] h-[24px]"
                              resizeMode="contain"
                            />
                            <View className="flex flex-1 items-end justify-between w-full">
                                <Text className="text-xs text-black">
                                  {/* {item.ar.slice(0, 100)}... */}
                                  {item.ar.length > 100 ? item.ar.substring(0, 100) + "..." : item.ar}
                                </Text>
                              </View>
                          </View>
                          <Text className="text-xs text-black font-AnekBanglaSemiBold pt-3">
                            {item.bn.length > 125 ? item.bn.substring(0, 125) + "..." : item.bn}
                          </Text>

                          <View className="flex flex-row items-center justify-between w-full mt-2">
                            <View className="border border-gray-white px-3 py-1 rounded-md">
                              <Text className="text-xs text-black font-AnekBanglaSemiBold">
                                সূরা {item.surahName_bn}
                              </Text>
                            </View>
                            <Text className="text-xs text-black text-right pr-1">
                              আয়াত নম্বর {convertToBengaliDigits(item.no)}
                            </Text>
                          </View>

                        </View>
                      </View>
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

export default BookedAyats;