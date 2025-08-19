import { ActivityIndicator, Animated, Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { surah } from "@/types/type";
import axios from "axios";
import Title from "@/components/Title";
import { convertToBengaliDigits } from "@/utils/hooks/useBengaliDigit";
import useAssignShapes from "@/utils/hooks/useAssignShapes";
import EmptyData from "@/components/EmptyData";
import useNetworkStatus from "@/utils/hooks/useNetworkStatus";
import Offline from "@/components/Offline";
const {getSurahNameBn} = require("@/utils/data/surahNames");

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

const SPACING = 20;
const AVATAR_SIZE = 100;
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [surahData, setSurahData] = useState<surah[] | null>(null);
    const [loading, setLoading] = useState(true);
    const scrollY = useRef(new Animated.Value(0)).current;
    const { isConnected, setIsConnected, checkNetworkStatus } = useNetworkStatus();

    const filteredSurahs = !surahData ? [] : surahData.filter((surah: surah) =>
      surah.name_bn.includes(searchQuery) || surah.name_en.includes(searchQuery) || surah.name_en.toUpperCase().includes(searchQuery) || surah.name_en.toLowerCase().includes(searchQuery) || surah.name_ar.includes(searchQuery)
    );

    const fetchData = async () => {
        setLoading(true);

        try {
            const connected = await checkNetworkStatus();
            if (!connected) {
                console.log("No internet connection.");
                setIsConnected(false);
                setSurahData(null);
                return;
            }
            setIsConnected(true);
            
            const response = await axios.get(`${API_URL}/surahs`, {
                headers: {
                    Authorization: " Bearer " + JWT_TOKEN,
                }
            });
            setSurahData(response.data.data);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
          ) : !isConnected ? (
            <Offline connect={fetchData}/>
          ) : (
            <View style={{ flex: 1, paddingHorizontal: 16, marginTop: Platform.OS === 'ios' ? 0 : 35, marginBottom: Platform.OS === 'ios' ? 0 : 50 }}>
              <Animated.View
                style={{
                  height: containerHeight, // Animates the container height
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
                  <Title title="সূরা তালিকা" subtitle="এখানে আপনি সূরা অনুসন্ধান করুন" btnText={false} />
                </Animated.View>
              </Animated.View>
              <TextInput
                placeholder="এখানে লিখুন"
                placeholderTextColor="#7B7B8B"
                value={searchQuery}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={(text) => setSearchQuery(text)}
                className="w-full px-4 border border-gray-black rounded-md text-gray-black mt-3 py-1 bg-white text-sm leading-6"
              />
              <Animated.FlatList
                data={surahWithShapes}
                contentContainerStyle={{ paddingTop: 16 }}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity key={index} 
                      onPress={() => {router.push(`/(root)/(tabs)/surah/${item._id}`)}} 
                    >
                      <Animated.View className="w-full mr-3 border border-gray-white bg-white rounded-lg p-2 flex flex-row items-center justify-start"
                        style={{
                          marginBottom: SPACING,
                          borderRadius: 12,
                        }}
                      >
                        <Image
                          source={item.shape}
                          className={`w-[${AVATAR_SIZE}px] h-[${AVATAR_SIZE}px]`}
                          resizeMode="contain"
                        />
                        <View className="flex-1 flex items-start justify-between pl-3">
                          <Text className="text-lg leading-8 text-black">
                              {/* সূরা {item.name_bn} */}
                              {/* {`সূরা ${item.name_bn}`.normalize('NFC')} */}
                               {`সূরা ${getSurahNameBn(item.no)}`.normalize('NFC')}
                          </Text>
                          <Text className="text-lg leading-8 text-black">
                            {item.name_ar}
                          </Text>
                          <View className="flex flex-row items-center justify-between w-full">
                            <Text className="text-sm leading-6 text-black text-left pr-1 font-IndopakRegular">
                                সর্বমোট আয়াত {convertToBengaliDigits(item.totalAyat)}
                            </Text>
                            <View className="flex items-center justify-between border border-gray-white px-3 py-1 rounded-md">
                              <Text className="text-md text-black font-NotoSansBengaliSemiBold">
                                {convertToBengaliDigits(item.no)}
                              </Text>
                            </View>
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

export default Search;