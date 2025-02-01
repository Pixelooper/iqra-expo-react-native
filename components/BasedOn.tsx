import { View } from "react-native";
import Title from "./Title";
import BlogList from "./BlogList";
import BasedOnList from "./BasedOnList";

type BasedOnProps = {
    basedon: [
        {
            _id: string;
            topic: string;
        }
    ]
};

const BasedOn: React.FC<BasedOnProps> = ({basedon}) => {
  return (
    <View className="w-full p-4 bg-white">
        <Title title="Ayat Based Topics" subtitle="আয়াত ভিত্তিক বিষয়গুলি এখানে খুঁজে পেতে পারেন" btnText="সব দেখুন" btnUrl="/(root)/(tabs)/basedons"/>
        <BasedOnList basedon={basedon}/>
    </View>
  );
};

export default BasedOn;
