import axios from "@/api/axios";
import { GetRequest } from "@/api/requests/post/get";
import { ListResponse } from "@/api/responses/post/list";
import { CreateRequest } from "@/api/requests/post/create";
export abstract class PostResource {
  static async get(request: GetRequest): Promise<ListResponse> {
    const response = await axios.get("/posts/", {
      params: request,
    });
    return response.data;
  }
  static async create(request: CreateRequest): Promise<number> {
    const response = await axios.post("/posts/", request);
    return response.status;
  }
}
