// hooks/useNetworkStatus.ts
import { useState, useEffect } from "react";
import * as Network from "expo-network";

export default function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  const checkNetworkStatus = async () => {
    try {
      const status = await Network.getNetworkStateAsync();
      setIsConnected(status.isConnected ?? true);
      return status.isConnected ?? true;
    } catch (err) {
      console.error("Network status check error:", err);
      setIsConnected(true); // fallback to true
      return true;
    }
  };

  useEffect(() => {
    // Initial check
    checkNetworkStatus();
  }, []);

  return { isConnected, setIsConnected, checkNetworkStatus };
}
