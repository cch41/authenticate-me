import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import HostForm from "../HostFormPage";

function HostFormModal({ location }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-hosting" onClick={() => setShowModal(true)}>
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <HostForm location={location} />
        </Modal>
      )}
    </>
  );
}

export default HostFormModal;
