"use client";

import { User } from "@/types/user";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmModal from "./ConfirmationModal";
import { useCallback, useState } from "react";
import { deleteUserAction, updateUserRoleAction } from "@/actions/userActions";
import { useRouter } from "next/navigation";
import { USER_ROLES } from "@/constants/enums";
import { useToast } from "@/contexts/ToastContext";

type UserCardProps = {
  user: User;
};

export default function UserCard({ user }: UserCardProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [newRole, setNewRole] = useState<string>(user.role);
  const router = useRouter();
  const { showToast } = useToast();

  const handleDelete = useCallback(async () => {
    setLoading(true);
    const res = await deleteUserAction(user._id);
    if (res.success) {
      router.refresh();
      showToast(res.message, "success");
    } else {
      showToast(res.message, "error");
    }
    setOpenModal(false);
    setLoading(false);
  }, [user]);

  const handleRoleUpdate = useCallback(async () => {
    if (newRole === user.role) return setOpenEdit(false);

    setLoading(true);
    const res = await updateUserRoleAction(user._id, newRole);
    setOpenEdit(false);
    setLoading(false);

    if (res.success) {
      router.refresh();
      showToast(res.message, "success");
    } else {
      showToast(res.message, "error");
    }
  }, [user, newRole]);

  return (
    <div className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition relative">
      <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>

      <div className="mt-2 gap-2 flex justify-between items-center text-sm">
        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 capitalize">
          {user.role}
        </span>
        <span className="text-gray-400">
          {new Date(user?.created_at)?.toLocaleDateString()}
        </span>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          title="Edit User"
          className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
          onClick={() => setOpenEdit(true)}
        >
          <Pencil size={18} />
        </button>
        <button
          title="Delete User"
          className="text-red-600 hover:text-red-800 transition cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          <Trash2 size={18} />
        </button>
      </div>
      <ConfirmModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete "${user.name}"?`}
        loading={loading}
      />
      {openEdit && (
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center p-4 z-10 rounded-xl shadow-xl">
          <p className="font-semibold mb-2">Update Role for {user.name}</p>
          <select
            className="border cursor-pointer px-3 py-1 rounded mb-3"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            {Object.values(USER_ROLES).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <div className="flex gap-3">
            <button
              className={`${
                loading ? "bg-gray-400" : "bg-blue-600"
              } cursor-pointer text-white px-4 py-1 rounded`}
              onClick={handleRoleUpdate}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              className="border cursor-pointer border-gray-400 px-4 py-1 rounded"
              onClick={() => setOpenEdit(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
