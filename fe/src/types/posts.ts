import { User } from "./user";

export interface Post {
  _id: string;
  title: string;
  content: string;
  user_id: User;
  created_at: string;
  updated_at: string;
}
