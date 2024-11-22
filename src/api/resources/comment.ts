import axios from "@/api/axios";
import { GetRequest } from "@/api/requests/comment/get";
import { ListResponse } from "@/api/responses/comment/list";
export abstract class CommentResource {
  static async get(request: GetRequest): Promise<ListResponse> {
    // const response = await axios.get("/posts/", {
    //   params: request,
    // });
    // return response.data;

    const mockResponse: ListResponse = {
      pagination: {
        pageIndex: request.pageIndex || 1,
        recordsPerPage: request.recordsPerPage || 10,
        totalRecords: 1000,
      },
      comments: [
        {
          authorID: 1,
          authorName: "Комментатор",
          createdAt: new Date("2024-01-01T10:00:00Z"),
          id: Math.random(),
          text: "funny cat haha comment",
          postID: request.postID,
          children: [
            {
              authorID: 2,
              authorName: "Путин",
              createdAt: new Date("2024-01-01T10:00:00Z"),
              id: Math.random(),
              text: "IM IN THE FUCCKING TREEE WOOOW",
              postID: request.postID,
              children: [
                {
                  authorID: 1,
                  authorName: "Комментатор",
                  createdAt: new Date("2024-01-01T10:00:00Z"),
                  id: Math.random(),
                  text: "по русски пиши еблан",
                  postID: request.postID,
                },
              ],
            },
          ],
        },
        {
          authorID: 1,
          authorName: "Комментатор",
          createdAt: new Date("2024-01-01T10:00:00Z"),
          id: Math.random(),
          text: "funny cat haha comment",
          postID: request.postID,
          children: [
            {
              authorID: 2,
              authorName: "Путин",
              createdAt: new Date("2024-01-01T10:00:00Z"),
              id: Math.random(),
              text: "IM IN THE FUCCKING TREEE WOOOW",
              postID: request.postID,
              children: [
                {
                  authorID: 1,
                  authorName: "Комментатор",
                  createdAt: new Date("2024-01-01T10:00:00Z"),
                  id: Math.random(),
                  text: "по русски пиши еблан",
                  postID: request.postID,
                },
              ],
            },
          ],
        },
      ],
    };

    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(mockResponse);
      }, 1500)
    );
  }
}
