"use client";

import { useState } from "react";
import { Key, Check } from "lucide-react";

export default function SettingsView() {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPin !== confirmPin) {
      setMessage({ type: "error", text: "New PINs do not match" });
      return;
    }

    if (newPin.length !== 6 || !/^\d+$/.test(newPin)) {
      setMessage({ type: "error", text: "PIN must be 6 digits" });
      return;
    }

    setLoading(true);
    try {
      // Change PIN (includes current PIN verification)
      const changeRes = await fetch("/api/admin/change-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPin, newPin }),
      });

      if (!changeRes.ok) {
        const data = await changeRes.json();
        setMessage({ type: "error", text: data.error || "Failed to change PIN" });
        setLoading(false);
        return;
      }

      setMessage({ type: "success", text: "PIN changed successfully" });
      setCurrentPin("");
      setNewPin("");
      setConfirmPin("");
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Settings</h1>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-6">
            <Key size={24} className="text-primary" />
            <h2 className="text-xl font-bold text-text-primary">Change Admin PIN</h2>
          </div>

          <form onSubmit={handleChangePin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Current PIN
              </label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                New PIN (6 digits)
              </label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Confirm New PIN
              </label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg flex items-center gap-2 ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {message.type === "success" && <Check size={20} />}
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || currentPin.length !== 6 || newPin.length !== 6 || confirmPin.length !== 6}
              className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Changing PIN..." : "Change PIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
