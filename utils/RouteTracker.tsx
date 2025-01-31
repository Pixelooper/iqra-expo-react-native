// 2. Create a route listener component
// components/RouteTracker.tsx
import { useEffect } from 'react';
import { usePathname } from 'expo-router';
import { useDispatch } from 'react-redux';
import { addPreviousRoute } from './store/slices/bookmarkSlice';

const RouteTracker = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname) {
      dispatch(addPreviousRoute(pathname));
    }
  }, [pathname]);

  return null;
};

export default RouteTracker;