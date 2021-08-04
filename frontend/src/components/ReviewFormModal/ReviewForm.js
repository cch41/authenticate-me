import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, editReview } from "../../store/location";
import { useHistory } from "react-router-dom";
import "./ReviewForm.css";

export default function ReviewForm({ locationId, setShowModal, edit, review }) {
  const [content, setContent] = useState(review ? review.content : "");
  const userId = useSelector((state) => state.session.user.id);
  const history = useHistory();
  const [recommends, setRecommends] = useState(
    review ? review.recommends : "none"
  );
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!edit) dispatch(addReview(content, userId, locationId, recommends));
    else {
      dispatch(editReview(content, locationId, recommends, review.id));
      window.location.reload();
    }
    setShowModal(false);
  };

  return (
    <form className="review" onSubmit={onSubmit}>
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <div className="recommends">
        Recommend:
        <i
          onClick={() => setRecommends(true)}
          className={`fas fa-solid fa-thumbs-up ${
            recommends && recommends !== "none" ? "--clicked" : ""
          }`}
        ></i>
        <i
          onClick={() => setRecommends(false)}
          className={`fas fa-solid fa-thumbs-down ${
            recommends ? "" : "--clicked"
          }`}
        ></i>
      </div>
      <button
        className="submit-review"
        disabled={
          !content.length || content.length > 500 || recommends === "none"
        }
        type="submit"
      >
        POST
      </button>
    </form>
  );
}
