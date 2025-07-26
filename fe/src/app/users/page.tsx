import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import UserCard from "@/components/UserCard";
import { User } from "@/types/user";
import { USER_ROLES } from "@/constants/enums";
import { fetchUserAction } from "@/actions/userActions";

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session || session.user.role !== USER_ROLES.ADMIN) {
    redirect("/auth");
  }

  const users: User[] = (await fetchUserAction()).data?.users || [];

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </section>
  );
}
