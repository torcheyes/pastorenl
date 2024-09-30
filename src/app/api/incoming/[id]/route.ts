import { NextRequest, NextResponse } from "next/server";
import {
  getIncomingRequestById,
  updateIncomingRequest,
  deleteIncomingRequest,
} from "@controllers/incoming.controller";
import { authMiddleware } from "@middleware/authMiddleware";

export async function GET(req: NextRequest) {
  const authResponse = await authMiddleware(req);
  if (authResponse.status === 401) {
    return authResponse;
  }

  const id = req.url.split("/").pop();
  if (!id) {
    return NextResponse.json({ error: "Invalid request ID" }, { status: 400 });
  }

  try {
    const request = await getIncomingRequestById(id);
    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }
    return NextResponse.json(request);
  } catch (error) {
    console.error("Error fetching incoming request:", error);
    return NextResponse.json(
      { error: "Failed to fetch incoming request" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  const authResponse = await authMiddleware(req);
  if (authResponse.status === 401) {
    return authResponse;
  }

  const id = req.url.split("/").pop();
  if (!id) {
    return NextResponse.json({ error: "Invalid request ID" }, { status: 400 });
  }

  const body = await req.json();

  try {
    const updatedRequest = await updateIncomingRequest(id, body);
    if (!updatedRequest) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }
    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("Error updating incoming request:", error);
    return NextResponse.json(
      { error: "Failed to update incoming request" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  console.log("DELETE request received");

  const authResponse = await authMiddleware(req);
  if (authResponse.status === 401) {
    console.log("Authentication failed");
    return authResponse;
  }

  const id = req.url.split("/").pop();
  console.log("Extracted ID:", id);

  if (!id) {
    console.log("Invalid ID");
    return NextResponse.json({ error: "Invalid request ID" }, { status: 400 });
  }

  try {
    console.log("Attempting to delete request with ID:", id);
    const deleteResult = await deleteIncomingRequest(id);
    console.log("Delete result:", deleteResult);

    if (deleteResult === null || deleteResult === undefined) {
      console.log("Request not found");
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }
    console.log("Request deleted successfully");
    return NextResponse.json(
      { message: "Request deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting incoming request:", error);
    return NextResponse.json(
      { error: "Failed to delete incoming request" },
      { status: 500 },
    );
  }
}

// path: src/app/api/incoming/[id]/route.ts
