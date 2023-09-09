import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa las clases CSS de Bootstrap Icons

export default function ButtonDelete({ onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = () => {
    onDelete();
    setShowModal(false);
  };

  return (
    <>
      {/* <Button variant="danger" onClick={handleShowModal}>
      <i className="bi bi-trash"></i>
      </Button> */}
      
      <Button variant="danger"><i  className="bi bi-trash" onClick={handleShowModal}></i></Button>
          
          
      

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este elemento?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
