import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RandomAyat from "@/components/RandomAyat";
import LastRead from "@/components/LastRead";
import Featured from "@/components/Featured";
import Blogs from "@/components/Blogs";
import Settings from "@/components/Settings";
import Mood from "@/components/Mood";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";

const Home = () => {
    const { data } = useSelector((state: RootState) => state.home);

    return (
        <SafeAreaView className="bg-light-olive">
            <FlatList data={[6]} renderItem={ ()=> (
                <View>
                    <RandomAyat random={data.random}/>
                    <Settings/>
                    <LastRead featured={data.featured}/>
                    <Featured featured={data.featured}/>
                    <Blogs/>
                    <Mood/>
                </View>
            )}
            />
        </SafeAreaView>
    );
};

export default Home;