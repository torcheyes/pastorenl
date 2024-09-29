'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AdminPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const response = await fetch('/api/verify-token', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token }),
                    });
                    const data = await response.json();
                    if (data.valid) {
                        router.push('/admin/dashboard');
                    } else {
                        router.push('/admin/login');
                    }
                } catch (error) {
                    console.error('Token verification error:', error);
                    router.push('/admin/login');
                }
            } else {
                router.push('/admin/login');
            }
            setIsLoading(false);
        };

        verifyToken();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-2xl font-semibold text-gray-600">
                    Loading...
                </div>
            </div>
        );
    }

    return null;
}

// path: src/app/admin/page.tsx