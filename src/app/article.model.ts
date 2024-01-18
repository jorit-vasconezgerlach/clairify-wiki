export interface Article {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  path: string;
  author: {
    name: string;
    id: string;
  };
  created_at: Date;
}
