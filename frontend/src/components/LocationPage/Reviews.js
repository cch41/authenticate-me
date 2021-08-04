import React from "react";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/location";
import ReviewFormModal from "../ReviewFormModal";

export default function Reviews({ reviews, userId }) {
  const dispatch = useDispatch();

  function deleteRev(e) {
    const [locationId, reviewId] = e.target.id.split(" ");
    const review = document.getElementById(`${reviewId}`);
    review.style.display = "none";
    dispatch(deleteReview(locationId, reviewId));
  }
  return (
    <div className="location-reviews">
      <h3>{reviews.length} reviews</h3>
      {reviews.map((review, i) => (
        <div key={i} className="one-review" id={review.id}>
          <div className="reviews-header">
            {review.recommends && (
              <>
                <span className="i-container up">
                  <i className="fas fa-solid fa-thumbs-up"></i>
                </span>
                <span className="username">{review.User.username + " "} </span>
                <span className="rec">- recommends this listing.</span>
                {review.userId === userId && (
                  <>
                    <ReviewFormModal
                      edit={true}
                      review={review}
                      locationId={review.locationId}
                    />
                    <span className="edit">
                      <i
                        id={`${review.locationId} ${review.id}`}
                        onClick={deleteRev}
                        className="fas fa-times"
                      ></i>
                    </span>
                  </>
                )}
              </>
            )}
            {!review.recommends && (
              <>
                <span className="i-container down">
                  <i className="fas fa-solid fa-thumbs-down"></i>
                </span>
                <span className="username">{review.User.username + " "}</span>
                <span className="rec">- doesn't recommend this listing.</span>
                {review.userId === userId && (
                  <>
                    <ReviewFormModal
                      edit={true}
                      review={review}
                      locationId={review.locationId}
                    />
                    <span className="edit">
                      <i
                        id={`${review.locationId} ${review.id}`}
                        onClick={deleteRev}
                        className="fas fa-times"
                      ></i>
                    </span>
                  </>
                )}
              </>
            )}
          </div>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}
