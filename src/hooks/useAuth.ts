import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const getToken = (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  const setToken = (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  };

  const removeToken = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  };

  const verifyToken = useCallback(async () => {
    const token = getToken();
    console.log("Token retrieved from localStorage in verifyToken:", token); // Debugging line

    if (token) {
      try {
        const response = await fetch("/api/verify-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        });
        const data = await response.json();
        if (response.ok && data.success) {
          if (data.token) {
            setToken(data.token);
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
    removeToken();
    setIsAuthenticated(false);
    await router.push("/admin/login");
  }, [router]);

  const authFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      const token = getToken();

      if (!token) {
        console.error("No token found in localStorage");
        throw new Error("No authentication token found");
      }

      const headers = new Headers(options.headers);
      headers.set("Authorization", `Bearer ${token}`);

      if (!(options.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
      }

      const authOptions: RequestInit = {
        ...options,
        headers,
      };

      const response = await fetch(url, authOptions);
      if (response.status === 401) {
        console.error("Authentication failed in authFetch");
        setIsAuthenticated(false);
        removeToken();
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
