import { useRef } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const AutoScrollToTop: React.FC<ScrollViewProps> = ({ children, ...props }) => {
    const scrollRef = useRef<ScrollView>(null);

    useFocusEffect(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
    });

    return (
        <ScrollView ref={scrollRef} {...props}>
            {children}
        </ScrollView>
    );
};

export default AutoScrollToTop;
