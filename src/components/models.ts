export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  email_verified_at: string;
  posts: [Post];
}

export interface Media {
  id: number;
  file: string;
  type: string;
  post_id: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  media: [Media];
  user_id: number;
  owner: User;
}
