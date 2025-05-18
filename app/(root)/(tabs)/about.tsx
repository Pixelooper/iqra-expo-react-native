import { View, Text, ScrollView, Image, Animated } from "react-native";
import book from "../../../assets/images/about.jpeg";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const about = () => {
  return (
    <AnimatedSafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView className="flex-1 bg-white px-4">
            <Image
                source={book}
                className="w-full h-[200px]"
                resizeMode="contain"
            />
            <Text className="text-2xl font-NotoSansBengaliBold leading-10 text-dark-green text-center mt-6">
                কুরআন ও হাদীস শরীফ বাংলায় 
            </Text>
            <Text className="text-sm leading-6 font-NotoSansBengaliMedium text-gray-700 text-justify">
                ইসলামিক জ্ঞানের এক অমূল্য ভাণ্ডার,{" "}
                <Text className="font-semibold">"কুরআন ও হাদীস শরীফ বাংলায়"</Text> 
                {" "}বইটি প্রিয় পাঠকদের জন্য সহজ-সরল বাংলায় কুরআন ও হাদীসের মূল শিক্ষাগুলো তুলে
                ধরেছে। মহান আল্লাহর কালাম এবং রাসূল (সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম) এর
                সুন্নাহর আলোকে জীবন পরিচালনার জন্য এটি একটি নির্ভরযোগ্য গ্রন্থ।
            </Text>

            <View className="p-4 rounded-lg">
                <Text className="text-lg leading-8 font-NotoSansBengaliSemiBold text-dark-green mb-2">
                    📌 এই বইয়ে যা পাবেন:
                </Text>
                <Text className="text-sm leading-6 font-NotoSansBengaliMedium text-gray-700 mb-1">✅ {" "}কুরআনের আয়াতসমূহ</Text>
                <Text className="text-sm leading-6 font-NotoSansBengaliMedium text-gray-700 mb-1">✅ {" "}সহজ-সরল বাংলা অনুবাদ সহ বিশ্লেষণ</Text>
                <Text className="text-sm leading-6 font-NotoSansBengaliMedium text-gray-700 mb-1">✅ {" "}বিশুদ্ধ হাদীস সংকলন</Text>
                <Text className="text-sm leading-6 font-NotoSansBengaliMedium text-gray-700 mb-1">✅ {" "}রাসূলের গুরুত্বপূর্ণ বাণী ও দিকনির্দেশনা</Text>
                <Text className="text-sm leading-6 font-NotoSansBengaliMedium text-gray-700 mb-1">✅ {" "}ইসলামিক জ্ঞান ও শিক্ষা</Text>
                <Text className="text-sm leading-6 font-NotoSansBengaliMedium text-gray-700 mb-1">✅ {" "}দৈনন্দিন জীবনে অনুসরণীয় নির্দেশিকা</Text>
            </View>
        </ScrollView>
    </AnimatedSafeAreaView>
  );
};

export default about;
