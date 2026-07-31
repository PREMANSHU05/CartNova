import { useState } from "react";
import { Star } from "lucide-react";
import API from "../api/axios";
import { toast } from "react-hot-toast";

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitReview = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to submit a review");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      setSubmitting(true);

      await API.post(`/products/${productId}/review`, { rating, comment });

      toast.success("Review added ⭐");
      setComment("");
      setRating(5);
      onReviewAdded();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="review-form">
      <h3>Add Your Review</h3>

      <div className="stars-select">
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

      <button onClick={submitReview} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default ReviewForm;
