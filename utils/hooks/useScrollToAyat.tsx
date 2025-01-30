import { useEffect, useRef, MutableRefObject } from 'react';
import { FlashList } from '@shopify/flash-list';

type ScrollConfig = {
  flashListRef: MutableRefObject<FlashList<any> | null>;
  ayatId?: string;
  data: any[];
  loading: boolean;
};

export const useScrollToAyat = ({
  flashListRef,
  ayatId,
  data,
  loading,
}: ScrollConfig) => {
  const scrollAttempted = useRef(false);

  useEffect(() => {
    if (!loading && ayatId && data.length > 0 && !scrollAttempted.current) {
      const index = data.findIndex((ayat) => ayat._id === ayatId);
      
      if (index !== -1 && flashListRef.current) {
        const scroll = () => {
          flashListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.1,
            viewOffset: 50,
          });
        };

        // First attempt
        scroll();

        // Fallback attempt
        const timeout = setTimeout(scroll, 500);
        scrollAttempted.current = true;

        return () => clearTimeout(timeout);
      }
    }
  }, [loading, ayatId, data, flashListRef]);
};