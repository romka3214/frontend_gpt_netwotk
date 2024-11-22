import { CommentResponse } from "@/api/responses/comment/comment";

export interface ListResponse {
  pagination: {
    pageIndex: number;
    recordsPerPage: number;
    totalRecords: number;
  };
  comments: Array<CommentResponse>;
}
