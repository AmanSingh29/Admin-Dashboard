"use client";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  loading: boolean;
};

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  loading = false,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-600 mt-2">{description}</p>

        <div className="mt-4 flex justify-end gap-3">
          <button
            className="px-4 py-1 cursor-pointer text-sm rounded-md bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            className={`px-4 py-1 cursor-pointer text-sm rounded-md ${
              loading ? "bg-gray-400" : "bg-red-600"
            } text-white`}
            onClick={onConfirm}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
