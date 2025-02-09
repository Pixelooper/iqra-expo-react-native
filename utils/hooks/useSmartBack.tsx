import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { RootState } from '../store/store';
import { removeLastRoute } from '../store/slices/bookmarkSlice';

const useSmartBack = () => {
    const dispatch = useDispatch();
    const previousRoutes = useSelector((state: RootState) => state.bookmark.previousRoutes);

    const smartBack = () => {
        if (previousRoutes.length > 1) {
            const targetRoute = previousRoutes[previousRoutes.length - 2];
            dispatch(removeLastRoute());
            router.push(targetRoute);
        } else {
            router.push('/home');
        }
    };

    return {
        smartBack
    };
};

export default useSmartBack;