import { router } from "expo-router";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { blogs } from "@/constants";
import shape from "../assets/shapes/shape-6.png";
import Title from "./Title";

const Blogs = () => {
  return (
    <View className="w-full p-4 bg-white">
        <Title title="Blogs" subtitle="আপনি এখানে তথ্যপূর্ণ ব্লগ পেতে পারেন" btnText="সব দেখুন"/>
        <View className="pt-4">
            {blogs.map((blog) => (
                <TouchableOpacity 
                    key={blog._id} onPress={() => {router.replace("/(root)/(tabs)/search")}} 
                    className="py-2 px-4 border border-gray-white bg-white rounded-lg mb-3"
                >
                    <Text className="text-gray-black font-AnekBanglaSemiBold">
                        {blog.title}
                    </Text>
                    <View className="w-full flex flex-row justify-center pt-1 pl-1">
                        <Image
                            source={shape}
                            className="w-[16px] h-[16px]"
                            resizeMode="contain"
                        />
                        <Text className="text-xs text-gray-black font-AnekBangla pl-2">
                            {blog.desc}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    </View>
  );
};

export default Blogs;
