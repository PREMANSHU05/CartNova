import { useCallback, useEffect, useState } from "react";
import { Star } from "lucide-react";
import API from "../api/axios";
import { toast } from "react-hot-toast";

import "../styles/ReviewSection.css";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const getReviews = useCallback(async () => {
    try {
      const { data } = await API.get(`/reviews/${productId}`);
      setReviews(data.reviews || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }, [productId]);

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      await getReviews();
    };

    if (isMounted) {
      loadReviews();
    }

    return () => {
      isMounted = false;
    };
  }, [getReviews]);

  const submitReview = async () => {
    try {
      await API.post(`/reviews/${productId}`, {
        rating,
        comment,
      });

      toast.success("Review added ⭐");
      setComment("");
      getReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="review-section">
      <h2>Customer Reviews ⭐</h2>

      <div className="review-form">
        <h3>Give Rating</h3>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={30}
              onClick={() => setRating(star)}
              fill={star <= rating ? "#facc15" : "none"}
              color="#facc15"
            />
          ))}
        </div>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={submitReview}>Submit Review</button>
      </div>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <h3>No reviews yet</h3>
        ) : (
          reviews.map((review) => (
            <div className="review-card" key={review._id}>
              <h3>{review.name}</h3>

              <div className="stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#facc15" color="#facc15" />
                ))}
              </div>

              <p>{review.comment}</p>

              <small>{new Date(review.createdAt).toLocaleDateString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
