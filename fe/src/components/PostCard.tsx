"use client";

import { Trash2, Pencil } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { Post } from "@/types/posts";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmModal from "./ConfirmationModal";
import { deletePostAction } from "@/actions/postActions";
import CreatePostSection from "./createPostSection";

type Props = {
  post: Post;
  currentUser: {
    _id: string;
    role: string;
  };
};

export default function PostCard({ post, currentUser }: Props) {
  const isEditor = currentUser.role === "editor";
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  function handleEdit(post: Post) {
    setEditingPost(post);
    setEditModalOpen(true);
  }

  const handleDelete = useCallback(async () => {
    setLoading(true);
    const res = await deletePostAction(post._id);
    setOpenModal(false);
    setLoading(false);

    if (res.success) {
      showToast(res.message, "success");
      router.refresh();
    } else {
      showToast(res.message, "error");
    }
  }, [post._id, router, showToast]);

  return (
    <div className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition relative">
      <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
      <p className="text-sm text-gray-600">{post.content}</p>

      <div className="mt-2 flex justify-between items-center text-sm">
        <span className="text-gray-400">
          by {post.user_id.name} on{" "}
          {new Date(post.created_at).toLocaleDateString()}
        </span>
      </div>

      {isEditor && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => handleEdit(post)}
            className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
            title="Edit Post"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => setOpenModal(true)}
            className="text-red-600 cursor-pointer hover:text-red-800 transition"
            title="Delete Post"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}

      <ConfirmModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete the post titled "${post.title}"?`}
        loading={loading}
      />
      <CreatePostSection
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingPost(null);
        }}
        postToEdit={editingPost}
        showCreateButton={false}
      />
    </div>
  );
}
