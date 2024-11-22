export interface CommentResponse {
  authorID: number;
  authorName: string;
  children?: Array<CommentResponse>;
  createdAt: Date;
  id: number;
  postID: number;
  text: string;
}
