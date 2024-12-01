import axios from "@/api/axios";
import { GetRequest } from "@/api/requests/post/get";
import { ListResponse } from "@/api/responses/post/list";
export abstract class PostResource {
  static async get(request: GetRequest): Promise<ListResponse> {
    const response = await axios.get("/posts/", {
      params: request,
    });
    return response.data;
  }
}
