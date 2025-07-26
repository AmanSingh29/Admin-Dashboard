"use server";

import { LOGIN, SIGNUP } from "@/constants/endpoints";
import { login } from "@/utils/auth";
import { fetchData } from "@/utils/fetch";

export async function handleSignup(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  if (!name || !email || !password) {
    return { success: false, message: "All fields are required." };
  }
  try {
    const res = await fetchData(SIGNUP, "POST", 0, {
      name,
      email,
      password,
    });
    const { token, user } = res || {};
    await login(token, user);
    return { success: true, message: "Signup successful!", data: res };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Something went wrong!",
    };
  }
}

export async function handleLogin(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email || !password) {
    return { success: false, message: "All fields are required." };
  }
  try {
    const res = await fetchData(LOGIN, "POST", 0, {
      email,
      password,
    });
    const { token, user } = res || {};
    await login(token, user);
    return { success: true, message: "Login successfully!", data: res };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Something went wrong!",
    };
  }
}
