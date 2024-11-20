import axios from "@/api/axios";
import { GetRequest } from "@/api/requests/post/get";
import { ListResponse } from "@/api/responses/post/list";
export abstract class PostResource {
  static async get(request: GetRequest): Promise<ListResponse> {
    // const response = await axios.get("/posts/", {
    //   params: request,
    // });
    // return response.data;

    const mockResponse: ListResponse = {
      pagination: {
        pageIndex: request.pagination.pageIndex || 1,
        recordsPerPage: request.pagination.recordsPerPage || 10,
        totalRecords: 1000,
      },
      posts: [
        {
          authorId: 1,
          authorName: "John Doe",
          date: new Date("2024-01-01T10:00:00Z"),
          id: Math.random(),
          text: "This is a mock post 1",
        },
        {
          authorId: 2,
          authorName: "Jane Smith",
          date: new Date("2024-01-02T11:00:00Z"),
          id: Math.random(),
          text: "This is a mock post 2",
        },
        {
          authorId: 1,
          authorName: "John Doe",
          date: new Date("2024-01-01T10:00:00Z"),
          id: Math.random(),
          text: "This is a mock post 1",
        },
        {
          authorId: 2,
          authorName: "Jane Smith",
          date: new Date("2024-01-02T11:00:00Z"),
          id: Math.random(),
          text: "This is a mock post 2",
        },
        {
          authorId: 1,
          authorName: "John Doe",
          date: new Date("2024-01-01T10:00:00Z"),
          id: Math.random(),
          text: "This is a mock post 1",
        },
        {
          authorId: 2,
          authorName: "Jane Smith",
          date: new Date("2024-01-02T11:00:00Z"),
          id: Math.random(),
          text: "This is a mock post 2",
        },
        {
          authorId: 1,
          authorName: "John Doe",
          date: new Date("2024-01-01T10:00:00Z"),
          id: Math.random(),
          text: "This is a mock post 1",
        },
        {
          authorId: 2,
          authorName: "Jane Smith",
          date: new Date("2024-01-02T11:00:00Z"),
          id: Math.random(),
          text: "This is a mock post 2",
        },
        {
          authorId: 1,
          authorName: "John Doe",
          date: new Date("2024-01-01T10:00:00Z"),
          id: Math.random(),
          text: "This is a mock post 1",
        },
        {
          authorId: 2,
          authorName: "Jane Smith",
          date: new Date("2024-01-02T11:00:00Z"),
          id: Math.random(),
          text: "This is a mock post 2",
        },
      ],
    };

    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(mockResponse);
      }, 1000)
    );
  }
}