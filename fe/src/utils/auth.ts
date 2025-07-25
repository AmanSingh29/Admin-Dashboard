'use server'

import { cookies } from "next/headers";
import { decode, encode } from "./encription";
import { redirect } from "next/navigation";

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;

  return decode(session);
}

export async function login(token: string, user: any) {
  const session = encode({ user, token });
  (await cookies()).set("session", session, {
    httpOnly: true,
    maxAge: 3600,
    sameSite: "lax",
    secure: true,
  });
}

export async function logout() {
  (await cookies()).delete("session");
  redirect("/auth")
}
