import React from 'react'
import Modal from '../../../../components/ui/Modal/Modal'
const EditUserModal = ({ isOpen, onClose, title, user }) => {
  console.log("Editing user:", user);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div className='space-y-4'>
        <p>Formulario para editar un usuario existente.</p>
        {/* Aquí iría el formulario real */}
      </div>
    </Modal>
  )
}

export default EditUserModal;