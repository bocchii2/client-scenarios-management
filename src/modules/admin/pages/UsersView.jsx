import { useState, useMemo } from 'react';
import { MdAdd, MdRefresh } from 'react-icons/md';
import Button from '../../../components/ui/Button/Button';
import NewUserModal from '../components/users/modal/CreateUserModal';
import UserTable from '../components/users/table/UserTable';

/* const usuarioData = [
  {
    id: 1,
    name: "Juan Pérez Reyes",
    email: "juan.perez@example.com",
    departamento: {
      name: "Ventas",
      description: "Departamento de ventas",
      nomenclatura: "VTA",
      id: 1
    },
    role: {
      name: "Administrador",
      description: "Usuario con permisos de administrador",
      id: 1
    },
    cargo: {
      name: "Gerente de Ventas",
      description: "Responsable del equipo de ventas",
      id: 1
    },
    identificacion: "123456789",
    status: "Activo",
    tipoIdentificacion: "Cédula",
    createdAt: "2023-10-01",
  },
  {
    id: 2,
    name: "Vannesa María Gómez López",
    email: "maria.gomez@example.com",
    identificacion: "987654321",
    status: "Inactivo",
    tipoIdentificacion: "Pasaporte",
    createdAt: "2023-10-02",
    role: {
      name: "Usuario",
      description: "Usuario con permisos limitados",
      id: 2
    },
    cargo: {
      name: "Ejecutivo de Ventas",
      description: "Responsable de la atención al cliente",
      id: 2
    },
    departamento: {
      name: "Ventas",
      description: "Departamento de investigación y desarrollo",
      nomenclatura: "ID",
      id: 1
    }
  },
  {
    id: 3,
    name: "Billie Eilish Pirate O'Connell",
    email: "billie.eilish@example.com",
    identificacion: "456789123",
    status: "Activo",
    tipoIdentificacion: "Cédula",
    createdAt: "2023-10-03",
    role: {
      name: "Administrador",
      description: "Usuario con permisos de administrador",
      id: 2
    },
    cargo: {
      name: "Artista",
      description: "Responsable de la creación musical",
      id: 2
    },
    departamento: {
      name: "Música",
      description: "Departamento de producción musical",
      nomenclatura: "MUS",
      id: 1
    }
  }
]; */

const usuarioData = [];
const UsersView = () => {
  // estado único para modales: { name: 'add' | 'edit' | 'delete' | null, payload: any }
  const [modal, setModal] = useState({ name: null, payload: null });

  const openModal = (name, payload = null) => setModal({ name, payload });
  const closeModal = () => setModal({ name: null, payload: null });

  const handleAddUser = () => {
    // TODO: Implementar modal de creación
    console.log('Agregar nuevo usuario');
    openModal("add");
  };

  const handleRefreshData = () => {
    console.log('Actualizar datos');
    // TODO: Implementar recarga de datos desde API
  };

  return (
    <div className='p-4 sm:p-6 w-full min-w-0 space-y-4 sm:space-y-6'>
      <NewUserModal
        isOpen={modal.name === "add"}
        onClose={closeModal}
        title="Agregar Nuevo Usuario"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-1">
            Administra usuarios, roles y permisos del sistema
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col xs:flex-row sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            onClick={handleRefreshData}
            variant="info"
            label="Actualizar"
            icon={<MdRefresh />}
            size="medium"
          />
          <Button
            onClick={handleAddUser}
            variant="success"
            label="Agregar Usuario"
            icon={<MdAdd />}
            size="medium"
          />
        </div>
      </div>

      <UserTable users={usuarioData} />
    </div>
  );
};

export default UsersView