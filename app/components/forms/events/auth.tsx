import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

const useFetch = () => {

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.removeItem('user')
          console.log("user")
        }
      }, []);
      
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage<boolean>('user', true)

  return {isLoggedIn};
};

export default useFetch;