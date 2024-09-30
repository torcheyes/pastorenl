import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; ${process.env.NODE_ENV === "production" ? "secure; " : ""}SameSite=Strict`;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; path=/; max-age=0`;
  };

  const verifyToken = useCallback(async () => {
    const token = getCookie("token");
    console.log("document.cookie:", document.cookie); // Debugging line
    console.log("Token retrieved from cookie in verifyToken:", token); // Debugging line

    if (token) {
      try {
        const response = await fetch("/api/verify-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        const data = await response.json();
        setIsAuthenticated(data.valid);
      } catch (error) {
        console.error("Token verification error:", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log("Redirecting to login");
      router.push("/admin/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const login = useCallback(
    async (mnemonic: string) => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mnemonic }),
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok && data.success) {
          console.log("Login successful");
          console.log("Token received:", data.token); // Debugging line
          if (data.token) {
            setCookie("token", data.token, 1);
            console.log("Token set in cookie:", getCookie("token")); // Debugging line
          } else {
            console.error("No token received from server");
          }
          setIsAuthenticated(true);
          await router.push("/admin/dashboard");
        } else {
          throw new Error(data.error || "Authentication failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        setIsAuthenticated(false);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const logout = useCallback(async () => {
    deleteCookie("token");
    setIsAuthenticated(false);
    await router.push("/admin/login");
  }, [router]);

  const authFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      const token = getCookie("token");
      console.log("Token retrieved from cookie in authFetch:", token); // Debugging line

      if (!token) {
        console.error("No token found in cookie");
        throw new Error("No authentication token found");
      }

      const headers = new Headers(options.headers);
      headers.set("Authorization", `Bearer ${token}`);

      console.log("Authorization header set:", headers.get("Authorization")); // Debugging line

      if (!(options.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
      }

      const authOptions: RequestInit = {
        ...options,
        headers,
        credentials: "include",
      };

      const response = await fetch(url, authOptions);
      if (response.status === 401) {
        console.error("Authentication failed in authFetch");
        setIsAuthenticated(false);
        deleteCookie("token");
        router.push("/admin/login");
        throw new Error("Authentication failed");
      }
      return response;
    },
    [router],
  );

  return { isAuthenticated, isLoading, login, logout, authFetch };
}

// path: src/hooks/useAuth.ts
