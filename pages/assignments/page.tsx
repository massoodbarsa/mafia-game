"use client";

import { useEffect, useState } from "react";

type Assignment = {
  _id: string;
  title: string;
  description?: string;
  week?: number;
  estimatedHours?: number;
  deadline?: string;
  status?: string;
  createdAt?: string;
};

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      const res = await fetch("/api/assignments");
      const data = await res.json();
      setAssignments(data.assignments || []);
      setLoading(false);
    };
    fetchAssignments();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>📋 Assignments</h1>
      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <ul>
          {assignments.map((a) => (
            <li key={a._id}>
              <strong>{a.title}</strong> – {a.status || "pending"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
