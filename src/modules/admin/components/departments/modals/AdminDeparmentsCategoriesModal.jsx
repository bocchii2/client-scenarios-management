import React from "react";
import Modal from "../../../../../components/ui/Modal/Modal";
import Input from "../../../../../components/ui/form/input/Input";
import useForm from "../../../../core/hooks/useForm";
import DepartmentCategoryApiService from "../../../services/DepartmentCategoryApiService";
import Table from "../../../../../components/ui/table/Table";
import Thead from "../../../../../components/ui/table/Thead";
import Tbody from "../../../../../components/ui/table/Tbody";
import Button from "../../../../../components/ui/Button/Button";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";


const AdminDeparmentsCategoriesModal = ({ isOpen, onClose }) => {
  const departmentCategoryServiceRef = React.useRef(new DepartmentCategoryApiService());
  const [categories, setCategories] = React.useState([]);
  const [editMode, setEditMode] = React.useState(false);
  const [loadingTable, setLoadingTable] = React.useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await departmentCategoryServiceRef.current.getDepartmentCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error al obtener categorías de departamentos:", error);
      }
    };
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, categories]);

  const {
    formData,
    errors,
    handleChange,
    cleanForm,
    validateRequiredFields,
    cleanErrors
  } = useForm({
    name: "",
    description: "",
  }, true);

  const handleCreateCategory = async (categoryData) => {
    if (!validateRequiredFields()) return;
    try {
      const payload = {
        nombre: categoryData.name,
        descripcion: categoryData.description,
      }
      setLoading(true);
      const newCategory = await departmentCategoryServiceRef.current.createDepartmentCategory(payload);
      if (newCategory) {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        cleanForm();
      }
    } catch (error) {
      console.error("Error al crear categoría de departamento:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    } finally {
      setLoading(false);
      cleanErrors();
      cleanForm();
      updateTableCategories();
    }
  }

  const handleDeleteCategory = async (categoryId) => {
    try {
      setLoadingTable(true);
      const response = await departmentCategoryServiceRef.current.deleteDepartmentCategory(categoryId);

      // Actualiza la lista de categorías después de la eliminación
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.error("Error al eliminar categoría de departamento:", error);
    } finally {
      setLoadingTable(false);
    }
  }

  const updateTableCategories = async () => {
    try {
      setLoadingTable(true);
      const response = await departmentCategoryServiceRef.current.getDepartmentCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error al actualizar categorías de departamentos:", error);
    } finally {
      setLoadingTable(false);
    }
  }

  const handleEditMode = (categoryId) => {
    setEditMode(!editMode);
    setSelectedCategoryId(categoryId);
    console.log("Modo edición:", !editMode, "Categoría seleccionada:", categoryId);
  }

  const handleOnClose = () => {
    setEditMode(false);
    setSelectedCategoryId(null);
    cleanErrors();
    cleanForm();
    onClose();
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        onClose={handleOnClose}
        title={"Categorias de departamentos"}
        showButtonAction={true}
        showSecondButton={true}
        labelActionButton={"Guardar cambios"}
        loadingActionButton={false}
        onActionButton={() => { console.log("Guardar cambios en categorías"); }}
        onActionSecondButton={handleOnClose}
        labelSecondButton={"Cerrar"}
      >
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-700 mb-6 pb-4">Agregar categoría</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              label="Nombre de la categoría"
              type="text"
              placeholder="Ingrese el nombre de la categoría"
              value={formData.name}
              error={errors.name}
              disabled={loading}
              onChange={handleChange}
            />
            <Input
              name="description"
              label="Descripción"
              type="text"
              placeholder="Ingrese la descripción de la categoría"
              value={formData.description}
              error={errors.description}
              disabled={loading}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <Button
              onClick={() => handleCreateCategory(formData)}
              variant="success"
              label="Agregar Categoría"
              icon={<MdAdd />}
              loading={loading}
              disabled={loading}
              size="medium"
            />
          </div>
        </div>
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-bold text-gray-700 pb-6 flex-3/4" >
            Lista de Categorías de Departamentos
          </h1>
        </div>
        <Table className="max-h-[400px]">
          <Thead headers={["Nombre", "Descripción", "Acciones"]} />
          <Tbody>
            {loadingTable ? (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center bg-white">
                  <div className="flex flex-col items-center gap-2">
                    {/* spinner simple */}
                    <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <div className="text-sm text-gray-700">Cargando categorías...</div>
                  </div>
                </td>
              </tr>
            ) : categories && categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category?.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {category?.nombre || "Sin nombre"}
                    {selectedCategoryId === category?.id && editMode && (
                      <span className="text-blue-500"> (Editando)</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {category?.descripcion || "Sin descripción"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex gap-2 justify-center">
                    <Button
                      variant={"outline"}
                      icon={<MdEdit color="blue" size={20} />}
                      size="small"
                      label={"Editar"}
                      onClick={() => handleEditMode(category?.id)}
                      disabled={loadingTable}
                    />
                    <Button
                      variant="outline"
                      size="small"
                      label="Eliminar"
                      icon={<MdDelete color="red" size={20} />}
                      onClick={() => handleDeleteCategory(category?.id)}
                      disabled={loadingTable}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-sm text-gray-500 bg-white">
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-light italic">No hay categorías disponibles.</p>
                    <span className="text-xs text-gray-400">Las categorías que agregues aparecerán aquí.</span>
                  </div>
                </td>
              </tr>
            )}
          </Tbody>
        </Table>
      </Modal>
    </React.Fragment>
  );
}
export default AdminDeparmentsCategoriesModal;