import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { useRouter, usePathname } from "next/navigation"

const useFetch = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const token = sessionStorage.getItem("token");

      // Pages where you don't want to redirect if user is not logged in
      const publicPaths = ["/", "/login", "/signup"];

      // If the token exists, consider the user as logged in
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);

        // Redirect only if the current route is not a public path
        if (!publicPaths.includes(pathname)) {
          router.push("/login");
        }
      }
    }
  }, [pathname, router]); useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const token = sessionStorage.getItem("token");

      // Pages where you don't want to redirect if user is not logged in
      const publicPaths = ["/", "/Dashboard", "/login", "/signup"];

      // If the token exists, consider the user as logged in
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);

        // Redirect only if the current route is not a public path
        if (!publicPaths.includes(pathname)) {
          router.push("/login");
        }
      }
    }
  }, [pathname, router]);

  return { isLoggedIn };
};

export default useFetch;
