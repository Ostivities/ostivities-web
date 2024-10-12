"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useFetch from "@/app/components/forms/create-events/auth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoggedIn, loading } = useFetch(); // Custom hook for authentication logic

  useEffect(() => {
    // Only attempt redirect if not loading
    if (!loading && isLoggedIn === false) {
      router.push('/login');
    }
  }, [isLoggedIn, loading, router]);

  // Render layout and its children if the user is logged in or loading is finished
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
};

export default Layout;
