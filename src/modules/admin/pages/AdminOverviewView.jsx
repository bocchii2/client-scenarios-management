import React from "react";
import useUserStore from "../../../store/user";
import Avatar from "../../../components/ui/avatar/Avatar";

const AdminOverviewView = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div>
      <h1>Admin Overview</h1>
      <p>This is the admin overview page.</p>

      <div className="flex flex-col items-center justify-center">
        <h2>User Information</h2>
        <p>Name: {user.name}</p>
        <p>Last Name: {user.lastname}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Address: {user.address}</p>
        <p>Role: {user.role}</p>
        <div className="flex items-center flex-col gap-1">
          <p className="text-lg font-bold">Avatar</p>
          <Avatar size="medium" />
        </div>
      </div>
    </div>
  );
};
export default AdminOverviewView;
