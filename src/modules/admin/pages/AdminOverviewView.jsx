import Avatar from "../../../components/ui/avatar/Avatar";
import { useCombinedStore } from "../../../store/userInstituteBounded";
import useAuthGuard from "../../../hooks/useAuthGuard";

const AdminOverviewView = () => {
  // Get all data from the combined store
  const { user: authUser } = useAuthGuard();
  const institution = useCombinedStore((state) => state.institution);

  console.log("User data:", authUser);
  console.log("Institution data:", institution);
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
              <Avatar size="medium" draggable={false} />
            </div>
          </div>

          {authUser ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Name:</span>
                <span className="text-gray-900">
                  {authUser.name} {authUser.lastname}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-gray-900">{authUser.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Phone:</span>
                <span className="text-gray-900">{authUser.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Address:</span>
                <span className="text-gray-900">{authUser.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Role:</span>
                <span className="text-gray-900 capitalize">{authUser.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${authUser.loggedIn
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {authUser.loggedIn ? "Logged In" : "Not Logged In"}
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
              <span className="font-medium text-gray-700">Institution:</span>
              <span className="text-gray-900 uppercase">
                {institution.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Career:</span>
              <span className="text-gray-900">{institution.carrer}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Position:</span>
              <span className="text-gray-900">{institution.position}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">
                Short Faculty Name: 
              </span>
              <span className="text-gray-900">
                {institution.shortFacultyName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Faculty:</span>
              <span className="text-gray-900 text-end">
                {institution.faculty}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default AdminOverviewView;
