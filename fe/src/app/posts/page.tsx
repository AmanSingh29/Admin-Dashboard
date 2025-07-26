import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { fetchPostsAction } from "@/actions/postActions";
import { USER_ROLES } from "@/constants/enums";
import PostCard from "@/components/PostCard";
import { Post } from "@/types/posts";
import CreatePostSection from "@/components/createPostSection";

export default async function AdminPostsPage() {
  const session = await getSession();
  if (
    !session ||
    ![USER_ROLES.EDITOR, USER_ROLES.VIEWER].includes(session.user.role)
  ) {
    redirect("/auth");
  }

  const posts: Post[] = (await fetchPostsAction())?.data?.data || [];

  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Posts</h2>
        {session.user.role === USER_ROLES.EDITOR && (
          <CreatePostSection/>
        )}
      </div>

      {posts?.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} currentUser={session.user} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts found.</p>
      )}
    </section>
  );
}
