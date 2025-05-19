import Title from '@/components/Title';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shapes } from "@/constants";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const JWT_TOKEN = process.env.EXPO_PUBLIC_JWT_TOKEN;

type Blog = {
    title: string;
    desc: string;
};

const Blog = () => {
    const { id } = useLocalSearchParams();
    const [blog, setBlog] = useState<Blog | []>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
                const response = await axios.get(`${API_URL}/blog/${id}`, {
                    headers: {
                        Authorization: " Bearer " + JWT_TOKEN,
                    }
                });
                setBlog(response.data.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();

        // Optional: Cleanup to reset state when component unmounts
        return () => {
            setBlog([]);
        };
    }, [id]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          {loading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          ) : (
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, marginTop: Platform.OS === 'ios' ? 0 : 35, marginBottom: Platform.OS === 'ios' ? 12 : 50 }}>
                <Image
                    source={shapes[Math.floor(Math.random() * shapes.length)]}
                    className="w-[100px] h-[100px] absolute right-0 top-3"
                    resizeMode="contain"
                />
                <Title title={blog?.title} subtitle={blog?.desc} btnText={false} />
            </ScrollView>
          )}
        </SafeAreaView>
    );
};

export default Blog;