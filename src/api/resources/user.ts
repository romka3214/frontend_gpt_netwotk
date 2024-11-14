import { LoginRequest } from "@/api/requests/login";
import axios from "@/api/axios";
import { LoginResponse } from "@/api/responses/login";
import { RegistrationRequest } from "@/api/requests/registration";

export abstract class UserResource {
  static async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await axios.request({
      url: "/auth/login/",
      method: "POST",
      data: request,
    });
    return response.data;
  }
  static async registration(request: RegistrationRequest): Promise<never> {
    return await axios.request({
      url: "/auth/registration/",
      method: "POST",
      data: request,
    });
  }
}
