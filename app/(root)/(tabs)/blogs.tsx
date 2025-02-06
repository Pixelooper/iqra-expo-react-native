import BlogList from "@/components/BlogList";
import Title from "@/components/Title";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Animated, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
                const response = await axios.get(`https://iqra-backend-git-master-iftikharrashas-projects.vercel.app/api/iqra/expo/blog`);
                setBlogs(response.data.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();

        // Optional: Cleanup to reset state when component unmounts
        return () => {
            setBlogs([]);
        };
    }, []);
    
    return (
        <AnimatedSafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          {loading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          ) : (
            <View style={{ flex: 1, paddingHorizontal: 16, marginTop: Platform.OS === 'ios' ? 0 : 35, marginBottom: Platform.OS === 'ios' ? 12 : 50 }}>
                <Title title="ইসলামিক ব্লগ" subtitle="আপনি এখানে তথ্যপূর্ণ ইসলামিক ব্লগ পেতে পারেন" btnText={false} />
                <BlogList blogs={blogs}/>
            </View>
          )}
        </AnimatedSafeAreaView>
    );
};

export default blogs;