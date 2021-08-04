import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "./ReviewForm";

function ReviewFormModal({ locationId, edit, review }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {!edit && (
        <button className="review" onClick={() => setShowModal(true)}>
          Write review
        </button>
      )}
      {edit && review && (
        <span className="edit">
          <i
            id={`${review.locationId} ${review.id}`}
            className="fas fa-pen"
            onClick={() => setShowModal(true)}
          ></i>
        </span>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm
            locationId={locationId}
            setShowModal={setShowModal}
            edit={edit}
            review={review}
          />
        </Modal>
      )}
    </>
  );
}

export default ReviewFormModal;
