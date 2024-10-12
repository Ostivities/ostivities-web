import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const useFetch = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const token = sessionStorage.getItem("token");

      // Static public paths
      const publicPaths = [
        "/",
        "/Dashboard",
        "/discover",
        // "/discover/discovery",
        "/forgot-password",
        "/password-reset",
        "/login",
        "/signup",
        "/about-us",
        "/faqs",
        "/terms-and-condition",
        "/privacy-policy",
        "/refund-policy",
        "/feedback",
        "/discover/event-not-found",
      ];

      // Updated regex patterns for dynamic public paths
      const dynamicPublicPaths = [
        /^\/discover\/[a-zA-Z0-9\s\-:.]+\/[a-zA-Z0-9\s\-:.]+$/,  // Matches paths like `/discover/Sunset Vibes: A Night of Chill Beats/670072d1aae36ba5c6a155e2`
      ];

      // Function to check if the current path is public
      const isPublicPath = (path: string) => {
        const decodedPath = decodeURIComponent(path);  // Decode the path
        console.log("Decoded path:", decodedPath);

        // Check if it's a static public path
        if (publicPaths.includes(decodedPath)) return true;

        // Check if it matches any dynamic public path pattern
        return dynamicPublicPaths.some((pattern) => {
          const isMatch = pattern.test(decodedPath);
          console.log(`Testing pattern: ${pattern}, Path: ${decodedPath}, Match: ${isMatch}`);
          return isMatch;
        });
      };

      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);

        // Check if the current path is public
        if (!isPublicPath(pathname)) {
          console.log("Private path detected, redirecting to /login");
          router.push("/login");
        } else {
          console.log("Public path, no redirection needed.");
        }
      }
      setLoading(false);
    }
  }, [pathname, router]);

  return { isLoggedIn, loading };
};

export default useFetch;
