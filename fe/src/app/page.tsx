import { USER_ROLES } from "@/constants/enums";
import { getSession } from "@/utils/auth";

export default async function HomePage() {
  const session = await getSession();
  const user = session?.user;

  const roleColor =
    user?.role === USER_ROLES.ADMIN
      ? "bg-red-100 text-red-600"
      : user?.role === USER_ROLES.EDITOR
      ? "bg-blue-100 text-blue-600"
      : "bg-gray-100 text-gray-600";

  return (
    <main className="min-h-[70vh] px-6 py-10 flex flex-col items-center text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        Welcome, <span className="text-blue-600">{user?.name}</span>!
      </h1>
      <p className="text-gray-600 text-lg mb-2">
        You're successfully logged in.
      </p>

      <div className="mt-4 mb-10">
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${roleColor}`}
        >
          Your Role: {user?.role}
        </span>
      </div>

      {/* Dashboard Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="bg-white shadow rounded-xl p-6 text-left">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Manage Users
          </h3>
          <p className="text-sm text-gray-600">
            View and control user access (admin only).
          </p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-left">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Create Posts
          </h3>
          <p className="text-sm text-gray-600">
            Share your ideas with the world (editor only).
          </p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-left">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            View Posts
          </h3>
          <p className="text-sm text-gray-600">
            Browse all the posts published by users.
          </p>
        </div>
      </div>
    </main>
  );
}
