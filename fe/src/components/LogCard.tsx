import { FC } from "react";

interface LogCardProps {
  action: string;
  description: string;
  created_at: string;
}

const LogCard: FC<LogCardProps> = ({ action, description, created_at }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold capitalize mb-1">
        {action.replace(/_/g, " ")}
      </h3>
      <p className="text-sm text-gray-700">{description}</p>
      <p className="text-xs text-gray-400 mt-2">
        {new Date(created_at)?.toLocaleDateString()}
      </p>
    </div>
  );
};

export default LogCard;
