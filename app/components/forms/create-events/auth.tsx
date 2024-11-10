import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useProfile } from "../../../hooks/auth/auth.hook";

const useFetch = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const { profile } = useProfile();
  // const profileData = localStorage.setItem("profileData", JSON.stringify(profile?.data?.data?.data));
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");
    const currentTime = Date.now();

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
      if (privatePaths.includes(decodedPath)) return true;
      return dynamicPrivatePaths.some((pattern) => pattern.test(decodedPath));
    };

    const isTokenValid = () => {
      if (token && tokenTimestamp) {
        const expiryTime = parseInt(tokenTimestamp) + 24 * 60 * 60 * 1000;
        return currentTime < expiryTime;
      }
      return false;
    };

    if (isTokenValid()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("tokenTimestamp");
      localStorage.removeItem("profileData");

      if (isPrivatePath(pathname)) {
        router.push("/login");
      }
    }

    if (profile?.isFetching === false && profile?.isSuccess === false) {
      setIsLoggedIn(false);
    }

    setLoading(false);

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
  }, [pathname, profile, router]);

  return { isLoggedIn, loading };
};

export default useFetch;


// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useProfile } from "../../../hooks/auth/auth.hook";

// const useFetch = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [profileData, setProfileData] = useState<any>(null); // Local profile state
//   const router = useRouter();
//   const pathname = usePathname();
//   const { profile } = useProfile();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const tokenTimestamp = localStorage.getItem("tokenTimestamp");
//     const cachedProfile = localStorage.getItem("profile");
//     const currentTime = Date.now();

//     const privatePaths = [
//       "/discover/create-events",
//       "/discover/settings",
//       "/discover/events-created"
//     ];

//     const dynamicPrivatePaths = [
//       /^\/discover\/create-events\/[a-zA-Z0-9-_]+(\/(manage|edit|delete))?$/
//     ];

//     const isPrivatePath = (path: string) => {
//       const decodedPath = decodeURIComponent(path);
//       if (privatePaths.includes(decodedPath)) return true;
//       return dynamicPrivatePaths.some((pattern) => pattern.test(decodedPath));
//     };

//     const isTokenValid = () => {
//       if (token && tokenTimestamp) {
//         const expiryTime = parseInt(tokenTimestamp) + 24 * 60 * 60 * 1000;
//         return currentTime < expiryTime;
//       }
//       return false;
//     };

//     if (isTokenValid()) {
//       setIsLoggedIn(true);

//       // If profile data is already in localStorage, use it directly
//       if (cachedProfile) {
//         setProfileData(JSON.parse(cachedProfile));
//       } else if (profile?.isSuccess) {
//         // If profile fetch was successful, cache it in localStorage
//         localStorage.setItem("profile", JSON.stringify(profile?.data));
//         setProfileData(profile?.data);
//       }
//     } else {
//       setIsLoggedIn(false);
//       localStorage.removeItem("token");
//       localStorage.removeItem("tokenTimestamp");
//       localStorage.removeItem("profile");

//       // Redirect to login if the path is private and no token is found
//       if (isPrivatePath(pathname)) {
//         router.push("/login");
//       }
//     }

//     if (profile?.isFetching === false && profile?.isSuccess === false) {
//       setIsLoggedIn(false);
//     }

//     setLoading(false);

//     const handleStorageChange = (event: StorageEvent) => {
//       if (event.key === "token" && event.newValue === null) {
//         setIsLoggedIn(false);
//         setProfileData(null);
//         router.push("/login");
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, [pathname, profile, router]);

//   return { isLoggedIn, loading, profileData };
// };

// export default useFetch;
