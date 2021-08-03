import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import BookingForm from "./BookingForm";

function BookingFormModal({ locationId, bookingId, edited, setEdited }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(false);
  }, [edited]);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Modify</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <BookingForm
            locationId={locationId}
            bookingId={bookingId}
            edited={edited}
            setEdited={setEdited}
          />
        </Modal>
      )}
    </>
  );
}

export default BookingFormModal;
