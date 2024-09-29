'use client';

import { useState, useEffect } from 'react';
import { IProduct } from "@models/product.model";
import ProductList from "@components/Admin/ProductList";
import { ProductForm } from '@components/Admin/Form/ProductForm';

type AdminView = 'list' | 'create' | 'edit';

export default function AdminProducts() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [currentView, setCurrentView] = useState<AdminView>('list');
    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products);
    };

    const handleEditProduct = (product: IProduct) => {
        setEditingProduct(product);
        setCurrentView('edit');
    };

    const handleDeleteProduct = async (slug: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`/api/products/${slug}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Product deleted successfully!');
                    fetchProducts();
                } else {
                    throw new Error('Failed to delete product');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product. Please try again.');
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Products Management</h2>
            <div className="mb-4">
                <button 
                    onClick={() => setCurrentView('list')} 
                    className={`px-4 py-2 rounded ${currentView === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-600'}`}
                >
                    List Products
                </button>
                <button 
                    onClick={() => setCurrentView('create')} 
                    className={`ml-2 px-4 py-2 rounded ${currentView === 'create' ? 'bg-blue-500 text-white' : 'bg-gray-600'}`}
                >
                    Create New Product
                </button>
            </div>

            {currentView === 'list' && (
                <ProductList 
                    products={products} 
                    onEdit={handleEditProduct} 
                    onDelete={handleDeleteProduct} 
                />
            )}

            {currentView === 'create' && (
                <div>
                    <h3 className="text-xl font-bold mb-2">Create New Product</h3>
                    <ProductForm />
                </div>
            )}

            {currentView === 'edit' && editingProduct && (
                <div>
                    <h3 className="text-xl font-bold mb-2">Edit Product</h3>
                    <ProductForm initialData={editingProduct} />
                </div>
            )}
        </div>
    );
}

// path: src/containers/Admin/AdminProducts.tsx