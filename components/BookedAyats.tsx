import { ActivityIndicator, Animated, FlatList, Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native"
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
            <View style={{ flex: 1, paddingHorizontal: 16, marginTop: Platform.OS === 'ios' ? 0 : 35 }}>
              <Animated.View
                style={{
                  height: containerHeight, // Animates the container height
                  // overflow: "hidden", // Prevents overflow content from being visible
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
                    <TouchableOpacity key={index} 
                      onPress={() => router.push(`/(root)/(tabs)/ayat/${item?.surahId}/${item?._id}`)}
                    >
                      <View className="w-full mr-3 border border-gray-white bg-white rounded-lg p-2 flex flex-row items-center justify-start"
                        style={{
                          marginBottom: 20,
                          borderRadius: 12,
                        }}
                      >
                        <Image
                          source={item.shape}
                          className={`w-[100px] h-[100px]`}
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