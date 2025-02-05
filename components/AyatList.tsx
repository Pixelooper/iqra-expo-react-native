import React, { memo } from 'react';
import { FlashList } from '@shopify/flash-list';
import SingleAyat from './SingleAyat';
import { Text, View } from 'react-native';

type AyatListProps = {
  currentAyatId?: string;
  sid: string;
  data: any[];
  flashListRef: React.RefObject<FlashList<any>>;
  tafsirPage: boolean;
  onMomentumScrollEnd?: () => void;
};

export const AyatList = memo(({ sid, data, flashListRef, tafsirPage, currentAyatId }: AyatListProps) => {
  return (
    <FlashList
      ref={flashListRef}
      data={data}
      extraData={currentAyatId}
      estimatedItemSize={150}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <SingleAyat
          key={item._id}
          no={item.no}
          sid={sid}
          aid={item._id}
          ar={item.ar}
          bn={item.bn}
          shanenuzul={item.shanenuzul}
          tika={item.tika}
          quote={item.quote}
          flashListRef={flashListRef}
          tafsirPage={tafsirPage}
        />
      )}
      ListHeaderComponent={
        <View className="text-center mb-8">
          <Text className="text-2xl text-dark-green mb-2 text-center">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </Text>
          <Text className="text-sm leading-6 font-AnekBangla text-dark-green mb-4 text-center">
            পরম করুণাময় অসীম দয়ালু আল্লাহতায়ালার নামে
          </Text>
        </View>
      }
      contentContainerStyle={data.length === 1 ? { paddingBottom: 0} : { paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    />
  );
});