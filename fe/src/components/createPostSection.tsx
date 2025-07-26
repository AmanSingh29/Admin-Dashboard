"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/contexts/ToastContext";
import { useRouter } from "next/navigation";
import { createPostAction, updatePostAction } from "@/actions/postActions";
import { Post } from "@/types/posts";

const initialPost = {
  title: "",
  content: "",
};

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  postToEdit?: Post | null;
  showCreateButton?: boolean;
};

export default function CreatePostSection({
  isOpen = false,
  onClose,
  postToEdit,
  showCreateButton = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState(initialPost);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (postToEdit) {
      setPost({ title: postToEdit.title, content: postToEdit.content });
    } else {
      setPost(initialPost);
    }
  }, [postToEdit]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  async function handleCreatePost() {
    setLoading(true);
    const res = postToEdit
      ? await updatePostAction(postToEdit._id, post)
      : await createPostAction(post);
    setLoading(false);

    if (res.success) {
      showToast(res.message, "success");
      router.refresh();
      setOpen(false);
      onClose && onClose();
    } else {
      showToast(res.message, "error");
    }
  }

  return (
    <>
      {showCreateButton && (
        <button
          className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded mb-4"
          onClick={() => setOpen(true)}
        >
          Create Post
        </button>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {postToEdit ? "Edit Post" : "Create New Post"}
            </h2>
            <input
              placeholder="Title"
              className="w-full border rounded px-3 py-2 mb-3"
              value={post.title}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <textarea
              placeholder="Content"
              className="w-full border rounded px-3 py-2 mb-3"
              rows={4}
              value={post.content}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, content: e.target.value }))
              }
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="border px-4 py-2 cursor-pointer rounded"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className={`${
                  loading ? "bg-gray-400" : "bg-blue-600"
                } text-white px-4 py-2 rounded cursor-pointer`}
                disabled={loading}
              >
                {loading ? "Saving..." : postToEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
