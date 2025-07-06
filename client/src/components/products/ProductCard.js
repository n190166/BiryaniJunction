import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import { toast } from 'react-hot-toast';

export default function ProductCard({ product }) {
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const { darkMode } = useTheme();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            toast.error('Please login to add items to cart');
            navigate('/login?redirect=/menu');
            return;
        }

        const success = addToCart(product);
        if (success) {
            toast.success('Item added to cart!');
        }
    };

    return (
        <div className={`group relative p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover object-center"
                />
            </div>
            <div className="mt-4">
                <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {product.name}
                </h3>
                <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {product.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                    <p className={`text-lg font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                        ₹{product.price}
                    </p>
                    <button
                        onClick={handleAddToCart}
                        disabled={!isAuthenticated}
                        className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white 
                            ${isAuthenticated 
                                ? 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500' 
                                : 'bg-gray-400 cursor-not-allowed'} 
                            transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                    >
                        {isAuthenticated ? (
                            <>
                                <svg
                                    className="mr-2 -ml-1 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                                Add to Cart
                            </>
                        ) : (
                            <>
                                <svg
                                    className="mr-2 -ml-1 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Login Required
                            </>
                        )}
                    </button>
                </div>
            </div>
            {!isAuthenticated && (
                <div className="absolute top-2 right-2">
                    <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full animate-pulse">
                        Login Required
                    </div>
                </div>
            )}
        </div>
    );
}
