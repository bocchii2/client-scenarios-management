import React from "react";
import Avatar from "../../../../../components/ui/avatar/Avatar";
import useAuthGuard from "../../../../../hooks/useAuthGuard";
const ProfileUser = ({ onClick }) => {
  const { user } = useAuthGuard();
  return (
    <div
      className="flex items-center gap-3 border p-2 rounded-lg bg-transparent hover:bg-gray-800 transition-colors cursor-pointer"
      onClick={onClick}
      title="Perfil de usuario"
    >
      <Avatar size="small" />
      <div>
        <p className="font-semibold text-white">{user.name}</p>
        <p className="text-sm text-gray-300">{user.email}</p>
        <p className="text-sm text-gray-300">{user.role}</p>
      </div>
    </div>
  );
};

export default ProfileUser;
