import dbConnect from "@utils/mongo.util";
import Incoming, { IIncoming } from "@models/incoming.model";
import { uploadImages } from "@utils/imageUpload.util";

export const getIncomingRequests = async (
  page: number = 1,
  limit: number = 10,
  status?: string,
): Promise<{
  requests: IIncoming[];
  totalPages: number;
  currentPage: number;
}> => {
  await dbConnect();
  try {
    const query = status ? { status } : {};
    const totalRequests = await Incoming.countDocuments(query);
    const totalPages = Math.ceil(totalRequests / limit);

    const requests = await Incoming.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return {
      requests,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Failed to get incoming requests:", error);
    throw new Error("Failed to get incoming requests");
  }
};

export const createIncomingRequest = async (
  requestData: Partial<IIncoming>,
  images: File[],
): Promise<IIncoming> => {
  await dbConnect();
  try {
    const uploadedImages = await uploadImages(images, "incoming");
    const newRequest = new Incoming({
      ...requestData,
      images: uploadedImages,
    });
    const savedRequest = await newRequest.save();
    return savedRequest;
  } catch (error) {
    console.error("Failed to create incoming request:", error);
    throw new Error("Failed to create incoming request");
  }
};

export const getIncomingRequestById = async (
  id: string,
): Promise<IIncoming | null> => {
  await dbConnect();
  try {
    const request = await Incoming.findById(id).lean();
    return request;
  } catch (error) {
    console.error(`Failed to get incoming request with id ${id}:`, error);
    throw new Error("Failed to get incoming request");
  }
};

export const updateIncomingRequest = async (
  id: string,
  updateData: Partial<IIncoming>,
): Promise<IIncoming | null> => {
  await dbConnect();
  try {
    const updatedRequest = await Incoming.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    return updatedRequest;
  } catch (error) {
    console.error(`Failed to update incoming request with id ${id}:`, error);
    throw new Error("Failed to update incoming request");
  }
};

export const deleteIncomingRequest = async (id: string): Promise<void> => {
  await dbConnect();
  try {
    await Incoming.findByIdAndDelete(id);
  } catch (error) {
    console.error(`Failed to delete incoming request with id ${id}:`, error);
    throw new Error("Failed to delete incoming request");
  }
};

// path: src/controllers/incoming.controller.ts
