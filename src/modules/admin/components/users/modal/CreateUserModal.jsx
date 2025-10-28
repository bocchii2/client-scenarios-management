import React from 'react'
import Modal from '../../../../../components/ui/Modal/Modal'
const NewUserModal = ({ isOpen, onClose, title }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div className='space-y-4'>
        <p>Formulario para crear un nuevo usuario.</p>
        {/* Aquí iría el formulario real */}
      </div>
    </Modal>
  )
}

export default NewUserModal