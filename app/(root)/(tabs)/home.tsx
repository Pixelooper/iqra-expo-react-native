import { FlatList, Text, View } from "react-native";
import RandomAyat from "@/components/RandomAyat";
import LastRead from "@/components/LastRead";
import Featured from "@/components/Featured";
import Blogs from "@/components/Blogs";
import Mood from "@/components/Mood";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import Saved from "@/components/Saved";

const Home = () => {
    const { data } = useSelector((state: RootState) => state.home);

    return (
            <FlatList data={[6]} renderItem={ ()=> (
                <View>
                    <RandomAyat random={data.random}/>
                    <Saved/>
                    <LastRead featured={data.featured}/>
                    <Featured featured={data.featured}/>
                    <Blogs/>
                    <Mood/>
                </View>
            )}
            />
    );
};

export default Home;