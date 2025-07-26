"use server";

import { POSTS_PATH } from "@/constants/endpoints";
import { fetchData } from "@/utils/fetch";

export async function fetchPostsAction() {
  try {
    const res = await fetchData(POSTS_PATH, "GET", 0);
    return { success: true, data: res };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function createPostAction(post: any) {
  const { title, content } = post || {};
  if (!title || !content) {
    return { success: false, message: "All fields are required." };
  }
  try {
    const res = await fetchData(POSTS_PATH, "POST", 0, {
      title,
      content,
    });
    return { success: true, message: "Post Created successfully!", data: res };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Something went wrong!",
    };
  }
}

export async function deletePostAction(post_id: string) {
  try {
    await fetchData(`${POSTS_PATH}/${post_id}`, "DELETE", 0);
    return { message: "Post deleted successfully!", success: true };
  } catch (err: any) {
    return { success: false, message: err.message || "Something went wrong!" };
  }
}

export async function updatePostAction(post_id: string, payload: any) {
  try {
    console.log("payload---------", payload, post_id);
    const res = await fetchData(
      `${POSTS_PATH}/${post_id}`,
      "PATCH",
      0,
      payload
    );
    return {
      success: true,
      message: "Post updated successfully!",
      data: res,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Failed to update post.",
    };
  }
}
