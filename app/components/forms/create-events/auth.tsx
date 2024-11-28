import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
// import { useProfile } from "../../../hooks/auth/auth.hook";
import { useCookies } from "react-cookie";

const useFetch = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [cookies, setCookie, removeCookie] = useCookies([
    "profileData",
  ]);


  const router = useRouter();
  const pathname = usePathname();

  // Private paths for authentication
  const privatePaths = [
    "/discover/create-events",
    "/discover/settings",
    "/discover/events-created"
  ];

  const dynamicPrivatePaths = [
    /^\/discover\/create-events\/[a-zA-Z0-9-_]+(\/(manage|edit|delete))?$/
  ];

  const isPrivatePath = (path: string) => {
    const decodedPath = decodeURIComponent(path);
    return privatePaths.includes(decodedPath) || dynamicPrivatePaths.some((pattern) => pattern.test(decodedPath));
  };

  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");
    const currentTime = Date.now();

    if (token && tokenTimestamp) {
      const expiryTime = parseInt(tokenTimestamp) + 24 * 60 * 60 * 1000; // 24 hours
      return currentTime < expiryTime;
    }
    return false;
  };


  useEffect(() => {
    // Token validation and initial login state setup
    if (isTokenValid()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("tokenTimestamp");
      localStorage.removeItem("profileData");
      removeCookie("profileData")
      if (isPrivatePath(pathname)) {
        router.push("/login");
      }
    }

    // Update login state if profile fetch fails
    // if (profile?.isFetching === false && profile?.isSuccess === false) {
    //   setIsLoggedIn(false);
    // }

    setLoading(false);

    // Listen for `localStorage` changes (for other tabs or windows)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token" && event.newValue === null) {
        setIsLoggedIn(false);
        router.push("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [pathname, router]);

  return { isLoggedIn, loading };
};

export default useFetch;
