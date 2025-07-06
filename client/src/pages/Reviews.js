import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

export default function Reviews() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        rating: 0,
        comment: '',
        productId: '',
    });

    useEffect(() => {
        if (orderId) {
            fetchOrder();
        } else {
            fetchUserReviews();
        }
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`/api/orders/${orderId}`);
            setOrder(response.data);
            // Initialize reviews for each product
            const initialReviews = response.data.items.map(item => ({
                productId: item._id,
                rating: 0,
                comment: '',
            }));
            setReviews(initialReviews);
        } catch (error) {
            console.error('Error fetching order:', error);
            toast.error('Failed to load order details');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserReviews = async () => {
        try {
            const response = await axios.get('/api/reviews/user');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            toast.error('Failed to load reviews');
        } finally {
            setLoading(false);
        }
    };

    const handleRatingChange = (productId, rating) => {
        if (orderId) {
            setReviews(prevReviews =>
                prevReviews.map(review =>
                    review.productId === productId
                        ? { ...review, rating }
                        : review
                )
            );
        } else {
            setNewReview(prev => ({ ...prev, rating }));
        }
    };

    const handleCommentChange = (productId, comment) => {
        if (orderId) {
            setReviews(prevReviews =>
                prevReviews.map(review =>
                    review.productId === productId
                        ? { ...review, comment }
                        : review
                )
            );
        } else {
            setNewReview(prev => ({ ...prev, comment }));
        }
    };

    const submitReview = async (productId) => {
        const review = reviews.find(r => r.productId === productId);
        if (!review.rating) {
            toast.error('Please select a rating');
            return;
        }

        try {
            await axios.post('/api/reviews', {
                productId,
                orderId,
                rating: review.rating,
                comment: review.comment,
            });
            toast.success('Review submitted successfully');
            navigate('/orders');
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review');
        }
    };

    const deleteReview = async (reviewId) => {
        try {
            await axios.delete(`/api/reviews/${reviewId}`);
            toast.success('Review deleted successfully');
            fetchUserReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.error('Failed to delete review');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {orderId ? 'Write Reviews' : 'Your Reviews'}
                        </h2>

                        {orderId ? (
                            <div className="space-y-8">
                                {order.items.map((item) => {
                                    const review = reviews.find(r => r.productId === item._id);
                                    return (
                                        <div
                                            key={item._id}
                                            className="border-b border-gray-200 pb-8"
                                        >
                                            <div className="flex items-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-24 w-24 object-cover rounded"
                                                />
                                                <div className="ml-4">
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {item.name}
                                                    </h3>
                                                    <div className="flex items-center mt-2">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <button
                                                                key={star}
                                                                onClick={() => handleRatingChange(item._id, star)}
                                                                className="focus:outline-none"
                                                            >
                                                                {star <= (review?.rating || 0) ? (
                                                                    <StarIcon className="h-5 w-5 text-yellow-400" />
                                                                ) : (
                                                                    <StarOutlineIcon className="h-5 w-5 text-yellow-400" />
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <textarea
                                                    value={review?.comment || ''}
                                                    onChange={(e) => handleCommentChange(item._id, e.target.value)}
                                                    placeholder="Write your review here..."
                                                    rows="3"
                                                    className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="mt-4">
                                                <button
                                                    onClick={() => submitReview(item._id)}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                                >
                                                    Submit Review
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <div
                                        key={review._id}
                                        className="bg-white border rounded-lg overflow-hidden p-6"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {review.productName}
                                                </h3>
                                                <div className="flex items-center mt-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <StarIcon
                                                            key={star}
                                                            className={`h-5 w-5 ${
                                                                star <= review.rating
                                                                    ? 'text-yellow-400'
                                                                    : 'text-gray-200'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteReview(review._id)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <p className="mt-2 text-gray-600">{review.comment}</p>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
