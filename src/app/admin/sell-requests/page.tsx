"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@hooks/useAuth";
import { IIncoming } from "@models/incoming.model";
import { FaEye, FaTrash, FaFilter } from "react-icons/fa";

export default function AdminSellRequestsPage() {
  const { isAuthenticated, isLoading, authFetch } = useAuth();
  const [requests, setRequests] = useState<IIncoming[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchRequests();
    }
  }, [isAuthenticated, statusFilter]);

  const fetchRequests = async () => {
    try {
      const url = `/api/incoming?${statusFilter ? `status=${statusFilter}` : ""}`;
      const response = await authFetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch sell requests");
      }
      const data = await response.json();
      setRequests(data.requests);
    } catch (error) {
      console.error("Error fetching sell requests:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this sell request?")) {
      try {
        console.log("Sending DELETE request for ID:", id);
        const response = await authFetch(`/api/incoming/${id}`, {
          method: "DELETE",
        });
        console.log("DELETE response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error data:", errorData);
          throw new Error(errorData.error || "Failed to delete sell request");
        }

        alert("Sell request deleted successfully");
        await fetchRequests();
      } catch (error) {
        console.error("Error deleting sell request:", error);
        alert("Failed to delete sell request");
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await authFetch(`/api/incoming/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update sell request status");
      }
      fetchRequests();
    } catch (error) {
      console.error("Error updating sell request status:", error);
      alert("Failed to update sell request status");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sell Requests</h1>
        <div className="flex items-center">
          <FaFilter className="mr-2" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Quoted">Quoted</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Requester
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request._id.toString()}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {request.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {request.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {request.brand} {request.modelName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {request.condition}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={request.status}
                    onChange={(e) =>
                      handleStatusChange(request._id.toString(), e.target.value)
                    }
                    className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Quoted">Quoted</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(request.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/admin/sell-requests/${request._id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <FaEye className="inline mr-1" /> View
                  </Link>
                  <button
                    onClick={() => handleDelete(request._id.toString())}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash className="inline mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// path: src/app/admin/sell-requests/page.tsx
