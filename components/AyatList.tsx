import React, { memo } from 'react';
import { FlashList } from '@shopify/flash-list';
import SingleAyat from './SingleAyat';
import { Text, View } from 'react-native';

type AyatListProps = {
  sid: string;
  data: any[];
  flashListRef: React.RefObject<FlashList<any>>;
  onMomentumScrollEnd?: () => void;
};

export const AyatList = memo(({ sid, data, flashListRef }: AyatListProps) => {
  return (
    <View className="mt-2 px-4 pt-6 text-dark-greem  border border-gray-white bg-white rounded-3xl" style={{ 
      flex: 1,
      minHeight: 200,
      backgroundColor: 'transparent' 
    }}>
    <FlashList
      ref={flashListRef}
      data={data}
      estimatedItemSize={150}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <SingleAyat
          no={item.no}
          sid={sid}
          aid={item._id}
          ar={item.ar}
          bn={item.bn}
          shanenuzul={item.shanenuzul}
          tika={item.tika}
          quote={item.quote}
        />
      )}
      ListHeaderComponent={
        <View className="text-center mb-8">
          <Text className="text-2xl text-dark-green mb-4 text-center">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </Text>
          <Text className="text-sm font-AnekBangla text-dark-green mb-4 text-center">
            পরম করুণাময় অসীম দয়ালু আল্লাহতায়ালার নামে
          </Text>
        </View>
      }
      contentContainerStyle={{ paddingBottom: 560 }}
      showsVerticalScrollIndicator={false}
    />
    
  </View>
  );
});