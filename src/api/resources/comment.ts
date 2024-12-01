import axios from "@/api/axios";
import { GetRequest } from "@/api/requests/comment/get";
import { ListResponse } from "@/api/responses/comment/list";
export abstract class CommentResource {
  static async get(request: GetRequest): Promise<ListResponse> {
    const response = await axios.get("/comments/", {
      params: request,
    });
    return response.data;
  }
}
