import Avatar from "../../../../components/ui/avatar/Avatar";
import { getStorageUrl } from "../../../../config/storage";
import { useAuthStore } from "../../../../store/useStore";
import userAdapter from "../../intrastructure/adapters/UserAdapter";

const AdminOverviewView = () => {
  // Get all data from the combined store
  const authUser = useAuthStore((s) => s.user);
  const loggedIn = useAuthStore((s) => s.isAuthenticated);
  const adaptedUser = userAdapter(authUser);
  console.log("User data:", adaptedUser);
  console.log("image url:", getStorageUrl(adaptedUser.profileImage));
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Informacion General</h1>
      <p className="text-gray-600 mb-8">Esta es la pagina de informacion general.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Information Section */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Informacion de Usuario
          </h2>

          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center flex-col gap-2">
              <Avatar size="large" draggable={false} src={getStorageUrl(adaptedUser.profileImage)} />
            </div>
          </div>

          {authUser ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Nombres completos:</span>
                <span className="text-gray-900">
                  {adaptedUser.fullName ? adaptedUser.fullName : <p>No definido</p>}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Correo Electronico:</span>
                <span className="text-gray-900">{adaptedUser.email ? adaptedUser.email : <p>No definido</p>}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Telefono:</span>
                <span className="text-gray-900">{adaptedUser.phone ? adaptedUser.phone : <p>No definido</p>}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Direccion:</span>
                <span className="text-gray-900">{adaptedUser.address ? adaptedUser.address : <p>No definido</p>}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Rol del usuario:</span>
                <span className="text-gray-900 capitalize">{adaptedUser.roleSlugs ? adaptedUser.roleSlugs.join(", ") : <p>No definido</p>}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Estado:</span>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${loggedIn
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {loggedIn ? "Sesion Activa" : "No Conectado"}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No user data available</p>
          )}
        </div>

        {/* Iformacion de departamento, cargo, rol, atributo */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Informacion Adicional
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Departamento:</span>
              <span className="text-gray-900 uppercase text-end">
                {adaptedUser?.departamento?.name ? (
                  <>
                    {adaptedUser.departamento.name} - {adaptedUser.departamento.nomenclature}
                  </>
                ) : (
                  <p className="text-gray-400">No definido</p>
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Cargo:</span>
              <span className="text-gray-900">
                {adaptedUser?.cargo?.name ? adaptedUser.cargo.name : <p className="text-gray-400">No definido</p>}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">
                Nomenclatura:
              </span>
              <span className="text-gray-900">
                {adaptedUser?.departamento?.nomenclature ? adaptedUser.departamento.nomenclature : <p className="text-gray-400">No definido</p>}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminOverviewView;
