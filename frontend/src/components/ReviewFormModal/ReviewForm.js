import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../store/location";
import "./ReviewForm.css";

export default function ReviewForm({ locationId, setShowModal }) {
  const [content, setContent] = useState("");
  const userId = useSelector((state) => state.session.user.id);
  const [recommends, setRocommends] = useState("none");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview(content, userId, locationId, recommends));
    setShowModal(false);
  };

  const handleClick = (e) => {};

  useEffect(() => {
    if (recommends === "none") return;

    const prev = document.querySelector(".--clicked");
    if (prev) prev.classList.remove("--clicked");

    if (recommends)
      document.querySelector(".fa-thumbs-up").classList.add("--clicked");
    else document.querySelector(".fa-thumbs-down").classList.add("--clicked");
  }, [recommends]);

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
          onClick={() => setRocommends(true)}
          className="fas fa-solid fa-thumbs-up"
        ></i>
        <i
          onClick={() => setRocommends(false)}
          className="fas fa-solid fa-thumbs-down"
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
