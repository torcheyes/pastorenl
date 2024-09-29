import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug, updateProduct, deleteProduct } from '@controllers/product.controller';
import { uploadImages, deleteImages } from '@utils/imageUpload.util';

import { IProduct } from '@models/product.model';
import { authMiddleware } from '@middleware/authMiddleware';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const product = await getProductBySlug(params.slug);
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    const authResponse = await authMiddleware(req);
    if (authResponse.status === 401) {
        return authResponse;
    }

    try {
        const formData = await req.formData();
        const product = await getProductBySlug(params.slug);
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Handle image uploads
        const newImages = await uploadImages(formData, params.slug);
        const existingImages = formData.get('imagePath') as string;
        const imagePath = [...(existingImages ? existingImages.split(',') : []), ...newImages].join(',');

        // Prepare update data
        const updateData: Partial<IProduct> = {
            title: formData.get('title') as string,
            brand: formData.get('brand') as string,
            tagline: formData.get('tagline') as string,
            description: formData.get('description') as string,
            price: Number(formData.get('price')),
            imagePath,
            specifications: JSON.parse(formData.get('specifications') as string),
            dimensions: JSON.parse(formData.get('dimensions') as string),
            features: JSON.parse(formData.get('features') as string),
            whatsInTheBox: JSON.parse(formData.get('whatsInTheBox') as string),
            negotiable: formData.get('negotiable') === 'true',
            category: formData.get('category') as string,
            discount: Number(formData.get('discount')),
            featured: formData.get('featured') === 'true'
        };

        const updatedProduct = await updateProduct(params.slug, updateData);
        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
    const authResponse = await authMiddleware(req);
    if (authResponse.status === 401) {
        return authResponse;
    }
    try {
        const product = await getProductBySlug(params.slug);
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        await deleteProduct(product.slug);
        await deleteImages(product.imagePath.split(','));
        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}

// path: src/app/api/products/[slug]/route.ts