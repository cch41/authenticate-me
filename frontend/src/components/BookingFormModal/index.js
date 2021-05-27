import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import BookingForm from './BookingForm';

function BookingFormModal({ locationId, bookingId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>EDIT REQUEST</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <BookingForm locationId={locationId} bookingId={bookingId} />
                </Modal>
            )}
        </>
    );
}

export default BookingFormModal;
