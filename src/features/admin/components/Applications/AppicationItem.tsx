// ApplicationItem.tsx
import React from "react";
import { Trash2, CheckCircle, XCircle } from "lucide-react";

interface ApplicationItemProps {
  id: number;
  name: string;
  studio: string;
  time: string;
  status: string;
  fileLink?: string;
  onAccept: () => void;
  onReject: () => void;
  onDelete: () => void;
}

const ApplicationItem: React.FC<ApplicationItemProps> = ({
  name,
  studio,
  time,
  status,
  fileLink,
  onAccept,
  onReject,
  onDelete,
}) => {
  const statusColor = {
    New: "bg-blue-100 text-blue-700",
    Accepted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
  }[status] || "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left */}
        <div>
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          <p className="text-gray-600">{studio}</p>
        </div>

        {/* Center */}
        <div className="flex items-center gap-6 text-sm">
          <span className="text-gray-500">{time}</span>
          <span className={`px-4 py-2 rounded-full font-medium ${statusColor}`}>
            {status}
          </span>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {fileLink && (
            <a
              href={fileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View File
            </a>
          )}

          <div className="flex gap-3">
            {status === "New" || status === "Pending" ? (
              <>
                <button
                  onClick={onAccept}
                  className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  <CheckCircle size={18} />
                  Accept
                </button>
                <button
                  onClick={onReject}
                  className="flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                  <XCircle size={18} />
                  Reject
                </button>
              </>
            ) : (
              <span className="text-gray-500 italic">Action completed</span>
            )}
          </div>

          <button
            onClick={onDelete}
            className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationItem;