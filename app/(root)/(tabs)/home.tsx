import { ActivityIndicator, FlatList, Text, View } from "react-native";
import RandomAyat from "@/components/RandomAyat";
import LastRead from "@/components/LastRead";
import Featured from "@/components/Featured";
import Blogs from "@/components/Blogs";
import Mood from "@/components/Mood";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import Saved from "@/components/Saved";
import BasedOn from "@/components/BasedOn";

const Home = () => {
    const { data } = useSelector((state: RootState) => state.home);
    const { lastRead } = useSelector((state: RootState) => state.bookmark);

    return (
            <FlatList data={[6]} renderItem={ ()=> (
                <View className="bg-white">
                    <RandomAyat random={data.random}/>
                    <Saved/>
                    {
                        lastRead.length > 0 ?
                        <LastRead lastRead={lastRead}/> : null
                    }
                    <Featured featured={data.featured}/>
                    <BasedOn basedon={data.basedon}/>
                    <Blogs blogs={data.blogs}/>
                    <Mood/>
                </View>
            )}
            />
    );
};

export default Home;