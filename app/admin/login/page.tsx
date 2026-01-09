"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [pin, setPin] = useState("");
  const [isSetup, setIsSetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkingSetup, setCheckingSetup] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if setup is needed
    fetch("/api/auth/check-setup")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        }
        setIsSetup(!data.exists);
        setCheckingSetup(false);
      })
      .catch((err) => {
        setError("Failed to connect to server. Please make sure the database is set up.");
        setCheckingSetup(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin, isSetup }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.details || "An error occurred");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (checkingSetup) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            {isSetup ? "Admin Setup" : "Admin Login"}
          </h1>
          <p className="text-text-muted">
            {isSetup
              ? "Create your admin PIN (6 digits)"
              : "Enter your 6-digit PIN"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="pin"
              className="block text-sm font-semibold text-text-primary mb-2"
            >
              6-Digit PIN
            </label>
            <input
              id="pin"
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={pin}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPin(value);
                setError("");
              }}
              className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="000000"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || pin.length !== 6}
            className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : isSetup ? "Create Admin" : "Login"}
          </button>
        </form>

        {!isSetup && (
          <p className="mt-6 text-center text-sm text-text-muted">
            Forgot your PIN? Contact the system administrator.
          </p>
        )}
      </motion.div>
    </div>
  );
}