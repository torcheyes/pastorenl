"use client";

import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

export default function LoginPage() {
  const [mnemonic, setMnemonic] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(mnemonic);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.",
      );
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Sign in to Admin Panel
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="mnemonic" className="sr-only">
            Mnemonic Phrase
          </label>
          <textarea
            id="mnemonic"
            name="mnemonic"
            rows={4}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your mnemonic phrase"
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
}

// path: src/app/admin/login/page.tsx
