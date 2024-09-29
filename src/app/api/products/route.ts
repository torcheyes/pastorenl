import { NextRequest, NextResponse } from 'next/server';
import { createProduct, getProductsWithPagination } from '@controllers/product.controller';
import { uploadImages } from '@utils/imageUpload.util'; 

import { IProduct } from '@models/product.model';
import { authMiddleware } from '@middleware/authMiddleware';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sort = searchParams.get('sort') || 'latest';

    try {
        const { products, totalPages, currentPage } = await getProductsWithPagination(page, limit, sort);
        return NextResponse.json({ products, totalPages, currentPage });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const authResponse = await authMiddleware(req);
    if (authResponse.status === 401) {
        return authResponse;
    }

    try {
        const formData = await req.formData();
        const slug = formData.get('slug') as string;
        const images = await uploadImages(formData, slug);
        const imagePath = images.join(',');

        // Prepare product data
        const productData: Partial<IProduct> = {
            slug,
            title: formData.get('title') as string,
            brand: formData.get('brand') as string,
            description: formData.get('description') as string,
            price: Number(formData.get('price')),
            imagePath,
            specifications: JSON.parse(formData.get('specifications') as string),
            dimensions: JSON.parse(formData.get('dimensions') as string),
            features: JSON.parse(formData.get('features') as string),
            whatsInTheBox: JSON.parse(formData.get('whatsInTheBox') as string),
            negotiable: formData.get('negotiable') === 'true',
            category: formData.get('category') as string,
            discount: Number(formData.get('discount'))
        };

        const newProduct = await createProduct(productData);
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: `Failed to create product: ${error.message}` }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Failed to create product: Unknown error' }, { status: 500 });
        }
    }
}


// path: src/app/api/products/route.ts