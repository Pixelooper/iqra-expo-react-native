import { FlatList, Text, View } from "react-native";
import RandomAyat from "@/components/RandomAyat";
import LastRead from "@/components/LastRead";
import Featured from "@/components/Featured";
import Blogs from "@/components/Blogs";
import Settings from "@/components/Settings";
import Mood from "@/components/Mood";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
    const { data } = useSelector((state: RootState) => state.home);

    return (
        <LinearGradient
          colors={['#211235', '#1C1C25', '#000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
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
        </LinearGradient>
    );
};

export default Home;