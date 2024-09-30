import { NextRequest, NextResponse } from "next/server";
import {
  getIncomingRequests,
  createIncomingRequest,
  deleteIncomingRequest,
  updateIncomingRequest,
} from "@controllers/incoming.controller";
import { authMiddleware } from "@middleware/authMiddleware";
import { IIncoming } from "@models/incoming.model";

export async function GET(req: NextRequest) {
  const authResponse = await authMiddleware(req);
  if (authResponse.status === 401) {
    return authResponse;
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const status = searchParams.get("status") || undefined;

  try {
    const { requests, totalPages, currentPage } = await getIncomingRequests(
      page,
      limit,
      status,
    );
    return NextResponse.json({ requests, totalPages, currentPage });
  } catch (error) {
    console.error("Error fetching incoming requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch incoming requests" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const images = formData.getAll("images") as File[];

    const requestData: Partial<IIncoming> = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      description: formData.get("description") as string,
      brand: formData.get("brand") as string,
      modelName: formData.get("modelName") as string,
      condition: formData.get("condition") as IIncoming["condition"],
    };

    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "phoneNumber",
      "description",
      "brand",
      "modelName",
      "condition",
    ];
    for (const field of requiredFields) {
      if (!requestData[field as keyof typeof requestData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    const newRequest = await createIncomingRequest(requestData, images);
    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating incoming request:", error);
    return NextResponse.json(
      { error: "Failed to create incoming request" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const authResponse = await authMiddleware(req);
  if (authResponse.status === 401) {
    return authResponse;
  }

  const id = req.url.split("/").pop();
  if (!id) {
    return NextResponse.json({ error: "Invalid request ID" }, { status: 400 });
  }

  try {
    await deleteIncomingRequest(id);
    return NextResponse.json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting incoming request:", error);
    return NextResponse.json(
      { error: "Failed to delete incoming request" },
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
    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("Error updating incoming request:", error);
    return NextResponse.json(
      { error: "Failed to update incoming request" },
      { status: 500 },
    );
  }
}

// path: src/api/incoming/route.ts
