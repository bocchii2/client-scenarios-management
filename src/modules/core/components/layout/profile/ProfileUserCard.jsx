import React from "react";
import Avatar from "../../../../../components/ui/avatar/Avatar";
import useAuthGuard from "../../../../../hooks/useAuthGuard";
import userAdapter from "../../../../admin/intrastructure/adapters/UserAdapter";
import { getStorageUrl } from "../../../../../config/storage";
const ProfileUser = ({ onClick }) => {
  const { user } = useAuthGuard();
  const parsedUser = userAdapter(user);
  console.log("ProfileUser - parsedUser:", parsedUser);
  console.log("ProfileUser - image url:", getStorageUrl(parsedUser.profileImage));
  return (
    <div
      className="flex items-center gap-3 border p-2 rounded-lg bg-transparent hover:bg-gray-800 transition-colors cursor-pointer"
      onClick={onClick}
      title="Perfil de usuario"
    >
      <Avatar size="small" src={getStorageUrl(parsedUser.profileImage)} />
      <div>
        <p className="font-semibold text-white">{parsedUser.fullName}</p>
        <p className="text-sm text-gray-300">{parsedUser.email}</p>
      </div>
    </div>
  );
};

export default ProfileUser;
