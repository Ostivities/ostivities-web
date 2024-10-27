import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useProfile, useLogout } from "../../../hooks/auth/auth.hook";


const useFetch = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const { profile } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const token = sessionStorage.getItem("token");
      const tokenTimestamp = sessionStorage.getItem("tokenTimestamp");
      const currentTime = Date.now();

      // Static private paths
      const privatePaths = [
        "/discover/create-events",
        "/discover/settings",
        "/discover/events-created"
      ];

      // Regex pattern for dynamic private paths
      const dynamicPrivatePaths = [
        /^\/discover\/create-events\/[a-zA-Z0-9-_]+(\/(manage|edit|delete))?$/, // Matches paths like `/discover/event_name/manage`, `/discover/event_name/edit`, or `/discover/event_name/delete`
      ];

      // Function to check if the current path is private
      const isPrivatePath = (path: string) => {
        const decodedPath = decodeURIComponent(path); // Decode the path for safety

        // Check if it's a static private path
        if (privatePaths.includes(decodedPath)) return true;

        // Check if it matches any dynamic private path pattern
        return dynamicPrivatePaths.some((pattern) => pattern.test(decodedPath));
      };

      const isTokenValid = () => {
        if (token && tokenTimestamp) {
          const expiryTime = parseInt(tokenTimestamp) + 24 * 60 * 60 * 1000; // 24 hours
          return currentTime < expiryTime;
        }
        return false;
      };

      if (isTokenValid()) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("tokenTimestamp");

        // Redirect to login if the path is private and no token is found
        if (isPrivatePath(pathname)) {
          router.push("/login");
        }
      }
      if(profile?.isFetching === false && profile?.isSuccess === false) {
        setIsLoggedIn(false);
      }
      setLoading(false);
    }
  }, [pathname, profile, router]);

  return { isLoggedIn, loading };
};

export default useFetch;
