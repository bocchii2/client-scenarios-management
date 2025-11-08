import React from 'react'
import Modal from '../../../../../../components/ui/Modal/Modal'
import UserDetails from './UserDetails'
const ViewUserModal = ({ isOpen, onClose, title, user }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <UserDetails user={user} />
    </Modal>
  )
}

export default ViewUserModal;