import { useState, useMemo } from "react";

export const filterUsers = (
  users = [],
  searchTerm = "",
  roleFilter = "all",
  statusFilter = "all"
) => {
  if (!Array.isArray(users)) return [];
  const term = (searchTerm || "").toLowerCase();

  return users.filter((user) => {
    const matchesSearch =
      (user.nombres_completos || "").toLowerCase().includes(term) ||
      (user.email || "").toLowerCase().includes(term) ||
      (user.documentNumber || "").includes(searchTerm);

    const matchesRole =
      roleFilter === "all" || (user.role && user.role.name === roleFilter);
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });
};

export default function useFilteredUsers(initialUsers = []) {
  const [users] = useState(initialUsers); // datos provistos desde API o mocks
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    return filterUsers(users, searchTerm, roleFilter, statusFilter);
  }, [users, searchTerm, roleFilter, statusFilter]);

  const resetFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setStatusFilter("all");
  };

  return {
    users,
    filteredUsers,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    resetFilters,
  };
}
