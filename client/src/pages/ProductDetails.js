import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { StarIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-hot-toast';

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/api/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            toast.error('Error loading product details');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!product.isAvailable) {
            toast.error('This item is currently unavailable');
            return;
        }
        await addToCart(product._id, quantity);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.error('Please login to submit a review');
            return;
        }

        setSubmittingReview(true);
        try {
            await axios.post(`/api/products/${id}/rate`, { rating, review });
            toast.success('Review submitted successfully');
            fetchProduct(); // Refresh product data to show new review
            setReview('');
        } catch (error) {
            toast.error('Failed to submit review');
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
                {/* Product Image */}
                <div className="lg:max-w-lg lg:self-end">
                    <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-center object-cover"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        {product.name}
                    </h1>

                    <div className="mt-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl text-gray-900">₹{product.price.toFixed(2)}</p>
                    </div>

                    {/* Rating */}
                    <div className="mt-3">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                                <StarIcon
                                    key={index}
                                    className={`h-5 w-5 ${
                                        index < Math.round(product.averageRating || 0)
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                    }`}
                                />
                            ))}
                            <span className="ml-2 text-sm text-gray-500">
                                ({product.ratings?.length || 0} reviews)
                            </span>
                        </div>
                    </div>

                    {/* Product Metadata */}
                    <div className="mt-6">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Category</h3>
                                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Spice Level</h3>
                                <p className="mt-1 text-sm text-gray-500">{product.spiceLevel}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Preparation Time</h3>
                                <p className="mt-1 text-sm text-gray-500">{product.preparationTime} minutes</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Serving Size</h3>
                                <p className="mt-1 text-sm text-gray-500">{product.servingSize}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900">Description</h3>
                        <div className="mt-2 prose prose-sm text-gray-500">
                            <p>{product.description}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900">Ingredients</h3>
                        <div className="mt-2">
                            <ul className="list-disc pl-4 space-y-2 text-sm text-gray-500">
                                {product.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="mt-10">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2 border rounded-l-md hover:bg-gray-50"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 text-center border-t border-b"
                                />
                                <button
                                    type="button"
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-2 border rounded-r-md hover:bg-gray-50"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.isAvailable}
                                className={`flex-1 px-6 py-3 text-base font-medium rounded-md text-white ${
                                    product.isAvailable
                                        ? 'bg-orange-600 hover:bg-orange-700'
                                        : 'bg-gray-300 cursor-not-allowed'
                                }`}
                            >
                                {product.isAvailable ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="mt-10">
                        <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>

                        {/* Review Form */}
                        {isAuthenticated && (
                            <form onSubmit={handleSubmitReview} className="mt-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Rating
                                        </label>
                                        <div className="mt-1 flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    className="p-1"
                                                >
                                                    <StarIcon
                                                        className={`h-5 w-5 ${
                                                            star <= rating ? 'text-yellow-400' : 'text-gray-300'
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Review
                                        </label>
                                        <textarea
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            rows={3}
                                            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={submittingReview}
                                        className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 disabled:bg-gray-300"
                                    >
                                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Reviews List */}
                        <div className="mt-6 space-y-6">
                            {product.ratings?.map((rating, index) => (
                                <div key={index} className="border-t border-gray-200 pt-6">
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    className={`h-5 w-5 ${
                                                        i < rating.rating ? 'text-yellow-400' : 'text-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="ml-2 text-sm text-gray-500">
                                            {new Date(rating.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{rating.review}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
