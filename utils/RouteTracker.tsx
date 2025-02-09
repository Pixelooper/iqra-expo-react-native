import { useEffect, useRef } from 'react';
import { usePathname } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { addPreviousRoute, replaceLastRouteIfTafsir } from './store/slices/bookmarkSlice';
import { RootState } from './store/store';

const isTafsirRoute = (route: string) => route.startsWith('/tafsir/');

const RouteTracker = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const previousPath = useRef<string | null>(null);
  const previousRoutes = useSelector((state: RootState) => state.bookmark.previousRoutes);

  useEffect(() => {
    if (pathname && pathname !== previousPath.current) {
      const isTafsir = isTafsirRoute(pathname);
      const wasTafsir = previousPath.current ? isTafsirRoute(previousPath.current) : false;

      if (isTafsir && wasTafsir) {
        // Replace previous Tafsir route with new one
        dispatch(replaceLastRouteIfTafsir(pathname));
      } else {
        // Add new route only if coming from non-Tafsir or first load
        if (previousRoutes[previousRoutes.length - 1] !== pathname) {
          dispatch(addPreviousRoute(pathname));
        }
      }

      previousPath.current = pathname;
    }
  }, [pathname]);

  return null;
};

export default RouteTracker;