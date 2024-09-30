import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const uploadDir = path.join(process.cwd(), "public", "products");

export async function uploadImages(
  data: FormData | File[],
  slug: string,
): Promise<string[]> {
  const productDir = path.join(uploadDir, slug);

  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir, { recursive: true });
  }

  const imagePaths: string[] = [];

  if (data instanceof FormData) {
    // Handle FormData
    const entries = Array.from(data.entries());
    for (const [key, value] of entries) {
      if (value instanceof Blob && key.startsWith("image")) {
        const imagePath = await saveImage(value, productDir, slug);
        imagePaths.push(imagePath);
      }
    }
  } else {
    // Handle File[]
    for (const file of data) {
      const imagePath = await saveImage(file, productDir, slug);
      imagePaths.push(imagePath);
    }
  }

  return imagePaths;
}

async function saveImage(
  file: Blob,
  productDir: string,
  slug: string,
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${uuidv4()}.${file.type.split("/")[1]}`;
  const filePath = path.join(productDir, filename);

  fs.writeFileSync(filePath, buffer);
  return `/products/${slug}/${filename}`;
}

export async function deleteImages(imagePaths: string[]): Promise<void> {
  for (const imagePath of imagePaths) {
    const fullPath = path.join(process.cwd(), "public", imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
}

// path: src/utils/imageUpload.util.ts
