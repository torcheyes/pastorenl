"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@hooks/useAuth";
import { IIncoming } from "@models/incoming.model";
import Image from "next/image";

const SellRequestPage = () => {
  const { isAuthenticated, isLoading, authFetch } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [request, setRequest] = useState<IIncoming | null>(null);

  useEffect(() => {
    if (isAuthenticated && id) {
      fetchRequest();
    }
  }, [isAuthenticated, id]);

  const fetchRequest = async () => {
    try {
      const response = await authFetch(`/api/incoming/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch sell request");
      }
      const data = await response.json();
      setRequest(data);
    } catch (error) {
      console.error("Error fetching sell request:", error);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await authFetch(`/api/incoming/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedRequest = await response.json();
      setRequest(updatedRequest);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Redirect is handled by useAuth
  }

  if (!request) {
    return <div>Request not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Sell Request Details</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <p>{request.name}</p>
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <p>{request.email}</p>
        </div>
        <div>
          <label className="block font-semibold">Phone Number</label>
          <p>{request.phoneNumber}</p>
        </div>
        <div>
          <label className="block font-semibold">Description</label>
          <p>{request.description}</p>
        </div>
        <div>
          <label className="block font-semibold">Brand</label>
          <p>{request.brand}</p>
        </div>
        <div>
          <label className="block font-semibold">Model</label>
          <p>{request.modelName}</p>
        </div>
        <div>
          <label className="block font-semibold">Condition</label>
          <p>{request.condition}</p>
        </div>
        <div>
          <label className="block font-semibold">Status</label>
          <select
            value={request.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800"
          >
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Quoted">Quoted</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Images</label>
          <div className="flex flex-wrap gap-2">
            {request.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                width={100}
                height={100}
                className="rounded"
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold">Created At</label>
          <p>{new Date(request.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SellRequestPage;

// path: src/app/admin/sell-requests/[id]/page.tsx
