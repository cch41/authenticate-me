import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "./ReviewForm";

function ReviewFormModal({ locationId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="review" onClick={() => setShowModal(true)}>
        Write review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm locationId={locationId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ReviewFormModal;
