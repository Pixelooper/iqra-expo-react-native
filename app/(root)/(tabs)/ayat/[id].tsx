import { useLocalSearchParams } from "expo-router";
import { Text, ActivityIndicator, View, TextInput, FlatList, Animated, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { ayat, surah } from "@/types/type";
import axios from "axios";
import { FlashList } from "@shopify/flash-list";
import SurahHead from "@/components/SurahHead";
import SingleAyat from "@/components/SingleAyat";
import { useDispatch } from "react-redux";
import { updateLastRead } from "@/utils/store/slices/bookmarkSlice";

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const Ayat = () => {
    const dispatch = useDispatch();
    const { id } = useLocalSearchParams();
    const [surahData, setSurahData] = useState<surah | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    const translateY = useRef(new Animated.Value(0)).current;
    const containerHeight = useRef(new Animated.Value(100)).current; // Adjust the default height as needed

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

    const filteredAyats = !surahData ? [] : surahData.ayat.filter((ayat: ayat) =>
        ayat.bn.includes(searchQuery) || ayat.ar.includes(searchQuery)
    );

    useEffect(() => {
      dispatch(updateLastRead(id));
    }, [dispatch, id]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
                const response = await axios.get(`https://iqra-backend-git-master-iftikharrashas-projects.vercel.app/api/iqra/expo/ayat/${id}`);
                setSurahData(response.data.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();

        // Optional: Cleanup to reset state when component unmounts
        return () => {
            setSurahData(null);
        };
    }, [id]);

    return (
        <AnimatedSafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                {loading ? 
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>  :
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
                                    paddingTop: 10,
                                    opacity: translateY.interpolate({
                                        inputRange: [-100, 0],
                                        outputRange: [0, 1],
                                        extrapolate: "clamp",
                                    }),
                                }}
                            >
                                <SurahHead
                                    ar={surahData?.name_ar}
                                    bn={surahData?.name_bn}
                                    total={surahData?.totalAyat}
                                    tafsir={false}
                                />
                            </Animated.View>
                        </Animated.View>
                        <TextInput
                            placeholder="এখানে লিখুন"
                            placeholderTextColor="#7B7B8B"
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className="w-full px-4 border border-gray-black rounded-md text-gray-black mt-3 py-2 bg-white"
                        />
                        <FlatList
                            data={[]} 
                            renderItem={null}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingBottom:560}}
                            className="mt-2 px-4 pt-6 text-dark-greem  border border-gray-white bg-white rounded-3xl"
                            ListEmptyComponent={
                                <View>
                                    <View className="text-center mb-8">
                                        <Text className="text-2xl text-dark-green mb-4 text-center">
                                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                                        </Text>
                                        <Text className="text-sm font-AnekBangla text-dark-green mb-4 text-center">
                                            পরম করুণাময় অসীম দয়ালু আল্লাহতায়ালার নামে
                                        </Text>
                                    </View>
                                    <FlashList
                                        estimatedItemSize={150}
                                        data={filteredAyats}
                                        renderItem={({ item }) => {
                                            const ayatData = item;
                                            return (
                                                <SingleAyat 
                                                    no={ayatData?.no} 
                                                    sid={surahData?._id ?? 0} 
                                                    aid={ayatData?._id ?? 0} 
                                                    ar={ayatData?.ar || ""} 
                                                    bn={ayatData?.bn || ""}
                                                />
                                            );
                                        }}
                                    />
                                </View>
                            }
                        />
                    </View>
                }
        </AnimatedSafeAreaView>
    );
};

export default Ayat;