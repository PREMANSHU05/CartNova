import { Star } from "lucide-react";

const ProductReviews = ({ reviews }) => {
  if (!reviews.length) {
    return (
      <p className="no-reviews">No reviews yet. Be the first to review.</p>
    );
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div className="review-card" key={review._id}>
          <div className="review-header">
            <h4>{review.name || "Anonymous"}</h4>
            <span>
              {new Date(review.createdAt).toLocaleDateString("en-IN")}
            </span>
          </div>

          <div className="review-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                fill={star <= review.rating ? "#facc15" : "none"}
                color="#facc15"
              />
            ))}
          </div>

          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
