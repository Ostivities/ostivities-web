import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const useFetch = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const token = sessionStorage.getItem("token");

      // Static public paths
      const publicPaths = ["/", "/Dashboard", "/discover", "/forgot-password", "/password-reset", "/login", "/signup"];

      // Regex patterns for dynamic public paths with two parameters
      const dynamicPublicPaths = [
        /^\/Dashboard\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+$/, // Matches paths like `/Dashboard/123/overview`, `/Dashboard/abc/settings`
        /^\/profile\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+$/,   // Matches paths like `/profile/123/posts`, `/profile/username/settings`
      ];

      // Function to check if the current path is public
      const isPublicPath = (path: string) => {
        // Check if it's a static public path
        if (publicPaths.includes(path)) return true;

        // Check if it matches any dynamic public path pattern
        return dynamicPublicPaths.some((pattern) => pattern.test(path));
      };

      // If the token exists, the user is logged in
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);

        // Redirect if the current route is not a public path
        if (!isPublicPath(pathname)) {
          router.push("/login");
        }
      }
    }
  }, [pathname, router]);

  return { isLoggedIn };
};

export default useFetch;
