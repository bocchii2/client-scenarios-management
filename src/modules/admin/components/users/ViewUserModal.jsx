import React from 'react'
import Modal from '../../../../components/ui/Modal/Modal'
const ViewUserModal = ({ isOpen, onClose, title, user }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div className='space-y-4'>
        <p>Detalles del usuario:</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </Modal>
  )
}

export default ViewUserModal;