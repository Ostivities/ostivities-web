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
        "/discover",
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
        "/not-found",
        "/discover/event-not-found",
      ];

      // Regex pattern for dynamic public paths
      const dynamicPublicPaths = [
        /^\/discover\/[a-zA-Z0-9-_]+(\/(tickets|contact-form))?$/,  // Matches paths like `/discover/event_name/tickets`, `/discover/event_name/contact-form`, or `/discover/event_name`
      ];
      // const dynamicPublicPaths = [
      //   /^\/discover\/[a-zA-Z0-9-_]+$/,  // Matches only `/discover/event_name`
      // ];

      // Function to check if the current path is public
      const isPublicPath = (path: string) => {
        const decodedPath = decodeURIComponent(path); // Decode the path for safety

        // Check if it's a static public path
        if (publicPaths.includes(decodedPath)) return true;

        // Check if it matches any dynamic public path pattern
        return dynamicPublicPaths.some((pattern) => pattern.test(decodedPath));
      };

      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);

        // Redirect to login if the path is not public
        if (!isPublicPath(pathname)) {
          router.push("/login");
        }
      }
      setLoading(false);
    }
  }, [pathname, router]);

  return { isLoggedIn, loading };
};

export default useFetch;
