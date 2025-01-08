// types.ts

export interface Comment {
  username: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  username: string;
  content: string;
  timestamp: string;
  likes: number;
  reposts: number;
  tags: string[];
  images: string[];
  comments: Comment[];
}
