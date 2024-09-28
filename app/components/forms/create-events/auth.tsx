import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { useRouter } from "next/navigation"

const useFetch = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const token = sessionStorage.getItem("token");
      // console.log(token);
      // If token exists, consider the user as logged in
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        router.push("/login");
      }
    }
  }, []);

  return { isLoggedIn };
};

export default useFetch;
