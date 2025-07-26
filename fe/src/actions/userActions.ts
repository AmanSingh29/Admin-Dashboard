"use server";

import { USERS_PATH } from "@/constants/endpoints";
import { fetchData } from "@/utils/fetch";

export async function fetchUserAction() {
  try {
    const users = await fetchData(USERS_PATH, "GET", 0);
    return {
      success: true,
      data: users,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Failed to fetch users.",
    };
  }
}

export async function deleteUserAction(userId: string) {
  try {
    await fetchData(`${USERS_PATH}/${userId}`, "DELETE", 0);
    return { message: "User deleted successfully!", success: true };
  } catch (err: any) {
    return { success: false, message: err.message || "Something went wrong!" };
  }
}

export async function updateUserRoleAction(user_id: string, role: string) {
  try {
    const res = await fetchData(USERS_PATH, "PATCH", 0, { role, user_id });
    return {
      success: true,
      message: "Role updated successfully!",
      data: res,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Failed to update role.",
    };
  }
}
