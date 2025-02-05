import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import shape from "../assets/shapes/shape-6.png";
import EmptyData from './EmptyData';

type BlogProps = {
    blogs: [
        {
            _id: string;
            title: string;
            desc: string;
        }
    ]
};

const BlogList: React.FC<BlogProps> = ({blogs}) => {
    return (
        <View className="pt-4">
            {
            blogs.length === 0 ?
                <EmptyData/> 
            :
            blogs.map((blog) => (
            <TouchableOpacity 
                key={blog._id} 
                onPress={() => router.push(`/(root)/(tabs)/blog/${blog._id}`)}
                className="py-2 px-4 border border-gray-white bg-white rounded-lg mb-3"
            >
                <Text className="text-gray-black font-AnekBanglaSemiBold">
                    {blog.title}
                </Text>
                <View className="w-full flex flex-row items-start justify-center pt-1 pl-1">
                    <Image
                        source={shape}
                        className="w-[16px] h-[16px]"
                        resizeMode="contain"
                    />
                    <Text className="text-sm leading-6 text-gray-black font-AnekBangla pl-2">
                        {blog.desc}...
                    </Text>
                </View>
            </TouchableOpacity>
            ))}
        </View>
    );
};

export default BlogList;