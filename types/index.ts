export interface Post {
  title: string;
  content: string;
  date: string;
}

export interface PostsData {
  [key: string]: Post;
}
