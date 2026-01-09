"use client";

import { useState, useEffect } from "react";
import { Mail, Check, X } from "lucide-react";

interface Submission {
  id: string;
  restaurantName: string;
  city: string;
  phone: string;
  branches: string;
  message: string | null;
  handled: boolean;
  createdAt: string;
}

export default function InboxView() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "handled" | "unhandled">("all");

  useEffect(() => {
    loadSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter === "handled") params.append("handled", "true");
      if (filter === "unhandled") params.append("handled", "false");

      const res = await fetch(`/api/contact/list?${params}`);
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error("Error loading submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleHandled = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handled: !currentStatus }),
      });

      if (res.ok) {
        loadSubmissions();
      }
    } catch (error) {
      console.error("Error updating submission:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-text-primary mb-6">Contact Inbox</h1>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === "all"
              ? "bg-primary text-white"
              : "bg-white text-text-primary border border-border"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unhandled")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === "unhandled"
              ? "bg-primary text-white"
              : "bg-white text-text-primary border border-border"
          }`}
        >
          Unhandled
        </button>
        <button
          onClick={() => setFilter("handled")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === "handled"
              ? "bg-primary text-white"
              : "bg-white text-text-primary border border-border"
          }`}
        >
          Handled
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading...</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-12 text-text-muted">
          <Mail size={48} className="mx-auto mb-4 opacity-50" />
          <p>No submissions found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className={`bg-white rounded-xl p-6 border ${
                submission.handled
                  ? "border-border opacity-75"
                  : "border-primary"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">
                    {submission.restaurantName}
                  </h3>
                  <p className="text-text-muted">
                    {submission.city} • {submission.branches} branch
                    {submission.branches !== "1" ? "es" : ""}
                  </p>
                </div>
                <button
                  onClick={() => toggleHandled(submission.id, submission.handled)}
                  className={`p-2 rounded-lg transition-colors ${
                    submission.handled
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  title={submission.handled ? "Mark as unhandled" : "Mark as handled"}
                >
                  {submission.handled ? (
                    <Check size={20} />
                  ) : (
                    <X size={20} />
                  )}
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <p>
                  <span className="font-semibold">Phone:</span> {submission.phone}
                </p>
                {submission.message && (
                  <div>
                    <span className="font-semibold">Message:</span>
                    <p className="text-text-muted mt-1">{submission.message}</p>
                  </div>
                )}
              </div>

              <p className="text-sm text-text-muted">
                Received: {new Date(submission.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}





