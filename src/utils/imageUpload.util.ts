import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const uploadDir = path.join(process.cwd(), 'public', 'products');

export async function uploadImages(formData: FormData, slug: string): Promise<string[]> {
    const productDir = path.join(uploadDir, slug);
    
    if (!fs.existsSync(productDir)) {
      fs.mkdirSync(productDir, { recursive: true });
    }
  
    const imagePaths: string[] = [];
    
    console.log('FormData keys:', Array.from(formData.keys()));
  
    // Use Array.from() to get an array of key-value pairs
    const entries = Array.from(formData.entries());
  
    for (const [key, value] of entries) {
      if (value instanceof Blob && key.startsWith('image')) {
        const buffer = Buffer.from(await value.arrayBuffer());
        const filename = `${uuidv4()}.${value.type.split('/')[1]}`;
        const filePath = path.join(productDir, filename);
        
        fs.writeFileSync(filePath, buffer);
        const imagePath = `/products/${slug}/${filename}`;
        imagePaths.push(imagePath);
      }
    }
  
    return imagePaths;
  }
  

export async function deleteImages(imagePaths: string[]): Promise<void> {
  for (const imagePath of imagePaths) {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
}


// path: src/utils/imageUpload.util.ts