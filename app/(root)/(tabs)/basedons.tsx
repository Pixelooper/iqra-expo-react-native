import BasedOnList from "@/components/BasedOnList";
import Offline from "@/components/Offline";
import Title from "@/components/Title";
import useNetworkStatus from "@/utils/hooks/useNetworkStatus";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Animated, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

type Baseons = [{
    _id: string;
    title: string;
    desc: string;
}];

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const basedons = () => {
    const [basedon, setBasedon] = useState<Baseons | []>([]);
    const [loading, setLoading] = useState(true);
    const { isConnected, setIsConnected, checkNetworkStatus } = useNetworkStatus();

    const fetchData = async () => {
        setLoading(true);

        try {
            const connected = await checkNetworkStatus();
            if (!connected) {
                console.log("No internet connection.");
                setIsConnected(false);
                setBasedon([]);
                return;
            }
            setIsConnected(true);
            
            const response = await axios.get(`${API_URL}/basedon`, {
                headers: {
                    Authorization: " Bearer " + JWT_TOKEN,
                }
            });
            setBasedon(response.data.data);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <AnimatedSafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          {loading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
            ) : !isConnected ? (
                <Offline connect={fetchData}/>
            ) : (
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, marginTop: Platform.OS === 'ios' ? 0 : 35, marginBottom: Platform.OS === 'ios' ? 12 : 50 }}>
                <Title title="বিষয়ভিত্তিক আয়াত" subtitle="বিষয় ভিত্তিক আয়াতগুলি এখানে খুঁজে পেতে পারেন" btnText={false}/>
                <BasedOnList basedon={basedon}/>
            </ScrollView>
          )}
        </AnimatedSafeAreaView>
    );
};

export default basedons;