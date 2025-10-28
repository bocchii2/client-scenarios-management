import React from 'react'
import Modal from '../../../../../components/ui/Modal/Modal'
const DeleteUserModal = ({ isOpen, onClose, user }) => {
  const [isLoading, setLoading] = React.useState(false);
  const deleteUser = () => {
    setLoading(true);
    console.log("Usuario eliminado:", user);
    // TODO: Implementar la lógica real de eliminación aquí
    setTimeout(() => {
      setLoading(false);
      onClose(); // Cerrar el modal después de la "eliminación"
    }, 1000);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar Usuario"
      showButtonAction={true}
      labelActionButton="Eliminar"
      onActionButton={deleteUser}
      showSecondButton={true}
      labelSecondButton="Cancelar"
      onActionSecondButton={onClose}
      loadingActionButton={isLoading}
      disableActionButton={isLoading}
    >
      <div>
        <p>¿Estás seguro de que deseas eliminar al usuario?</p>
      </div>
    </Modal>

  )
}

export default DeleteUserModal