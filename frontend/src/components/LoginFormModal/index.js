import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";

function LoginFormModal({ show }) {
  console.log();
  const [showModal, setShowModal] = useState(show ? true : false);

  return (
    <>
      <p className="login" onClick={() => setShowModal(true)}>
        Log In
      </p>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
