import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

const useFetch = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const token = sessionStorage.getItem("token");
      // console.log(token);
      // If token exists, consider the user as logged in
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);

  return { isLoggedIn };
};

export default useFetch;
