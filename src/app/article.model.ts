export interface Article {
  _id: string;
  title: string;
  content: string;
  tags: string;
  // tags: string[];
  path: string;
  // author: {
    author_name: string;
    author_id: string;
  // };
  created_at: string;
}
