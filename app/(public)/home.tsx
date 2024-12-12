import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import bg from "@/assets/images/pattern.png";
import RandomAyat from "@/components/RandomAyat";
import LastRead from "@/components/LastRead";
import Featured from "@/components/Featured";
import Blogs from "@/components/Blogs";
import Settings from "@/components/Settings";
import Mood from "@/components/Mood";

const Home = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <ImageBackground source={bg} resizeMode="repeat" className="min-h-screen flex justify-start bg-light-olive">
                    <RandomAyat/>
                    <Settings/>
                    <LastRead/>
                    <Featured/>
                    <Blogs/>
                    <Mood/>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;