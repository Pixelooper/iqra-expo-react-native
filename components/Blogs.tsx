import { View } from "react-native";
import Title from "./Title";
import BlogList from "./BlogList";

type BlogProps = {
    blogs: {
        _id: string;
        title: string;
        desc: string;
    }
};

const Blogs: React.FC<BlogProps> = ({blogs}) => {
  return (
    <View className="w-full p-4 bg-white">
        <Title title="Blogs" subtitle="আপনি এখানে তথ্যপূর্ণ ইসলামিক ব্লগ পেতে পারেন" btnText="সব দেখুন" btnUrl="/(root)/(tabs)/blogs"/>
        <BlogList blogs={blogs}/>
    </View>
  );
};

export default Blogs;
