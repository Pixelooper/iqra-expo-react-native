import BlogList from "@/components/BlogList";
import Title from "@/components/Title";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Animated, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Offline from "@/components/Offline";
import useNetworkStatus from "@/utils/hooks/useNetworkStatus";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

type Blogs = [
    {
        _id: string;
        title: string;
        desc: string;
    }
];

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const blogs = () => {
    const [blogs, setBlogs] = useState<Blogs | []>([]);
    const [loading, setLoading] = useState(true);
    const { isConnected, setIsConnected, checkNetworkStatus } = useNetworkStatus();

    const fetchData = async () => {
        setLoading(true);

        try {
            const connected = await checkNetworkStatus();
            if (!connected) {
                console.log("No internet connection.");
                setIsConnected(false);
                setBlogs([]);
                return;
            }
            setIsConnected(true);
            
            const response = await axios.get(`${API_URL}/blog`, {
                headers: {
                Authorization: "Bearer " + JWT_TOKEN,
                },
            });
            setBlogs(response.data.data);
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
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            marginTop: Platform.OS === 'ios' ? 0 : 35,
            marginBottom: Platform.OS === 'ios' ? 12 : 75,
          }}
        >
          <Title
            title="ইসলামিক আর্টিকেল"
            subtitle="আপনি এখানে তথ্যপূর্ণ ইসলামিক আর্টিকেল পেতে পারেন"
            btnText={false}
          />
          <BlogList blogs={blogs} />
        </View>
      )}
    </AnimatedSafeAreaView>
    );
};

export default blogs;