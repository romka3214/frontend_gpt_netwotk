import { PostResponse } from "@/api/responses/post/post";

export interface ListResponse {
  pagination: {
    pageIndex: number;
    recordsPerPage: number;
    totalRecords: number;
  };
  posts: Array<PostResponse>;
}
