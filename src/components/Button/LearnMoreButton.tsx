import React from 'react';
import Link from 'next/link';

export const LearnMoreButton: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ 
    className = '', 
    ...props 
}) => {
    return (
        <Link 
            href="/about" 
            {...props} 
            className={`inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-300 bg-gray-100 text-gray-800 hover:bg-gray-50 ${className}`}
        >
            Learn More
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                <path d="M4 12L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.5 4H12V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </Link>
    );
}

// path: src/components/Button/LearnMoreButton.tsx
