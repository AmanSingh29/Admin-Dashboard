import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { USER_ROLES } from "@/constants/enums";
import LogCard from "@/components/LogCard";
import { fetchLogsAction } from "@/actions/logs";

type LogCard = {
  action: string;
  description: string;
  created_at: string;
  _id: string;
};

export default async function AdminLogsPage() {
  const session = await getSession();
  if (!session || session.user.role !== USER_ROLES.ADMIN) {
    redirect("/auth");
  }

  const logs: LogCard[] = (await fetchLogsAction()).data?.logs || [];

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4">Activity Logs</h2>

      {logs.length === 0 ? (
        <p className="text-gray-500">No activity logs available.</p>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <LogCard
              key={log._id}
              action={log.action}
              description={log.description}
              created_at={log.created_at}
            />
          ))}
        </div>
      )}
    </section>
  );
}
