import { ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import bg from "@/assets/images/pattern.png";
import RandomAyat from "@/components/RandomAyat";
import LastRead from "@/components/LastRead";
import Featured from "@/components/Featured";
import Blogs from "@/components/Blogs";
import Settings from "@/components/Settings";
import Mood from "@/components/Mood";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";

const Home = () => {
    const { data } = useSelector((state: RootState) => state.surah);

    return (
        <SafeAreaView>
            <ScrollView>
                <ImageBackground source={bg} resizeMode="repeat" className="min-h-screen flex justify-start bg-light-olive">
                    <RandomAyat/>
                    <Settings/>
                    <LastRead data={data}/>
                    <Featured data={data}/>
                    <Blogs/>
                    <Mood/>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;