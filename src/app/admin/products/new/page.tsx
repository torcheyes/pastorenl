'use client';

import { useAuth } from '@hooks/useAuth';
import { ProductForm } from '@components/Admin/Form/ProductForm';

export default function NewProductPage() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
            <ProductForm />
        </div>
    );
}

// path: src/app/admin/products/new/page.tsx
