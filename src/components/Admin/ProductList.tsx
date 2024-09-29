import { IProduct } from "@models/product.model";

interface ProductListProps {
    products: IProduct[];
    onEdit: (product: IProduct) => void;
    onDelete: (slug: string) => void;
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
    return (
        <div>
            <h3 className="text-xl font-bold mb-2">Product List</h3>
            <ul>
                {products.map(product => (
                    <li key={product.slug} className="mb-2 flex items-center">
                        <span className="flex-grow">{product.title}</span>
                        <button 
                            onClick={() => onEdit(product)} 
                            className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => onDelete(product.slug)} 
                            className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
