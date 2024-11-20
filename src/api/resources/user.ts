import { LoginRequest } from "@/api/requests/user/login";
import axios from "@/api/axios";
import { LoginResponse } from "@/api/responses/user/login";
import { RegistrationRequest } from "@/api/requests/user/registration";
import { RefreshRequest } from "@/api/requests/user/refresh";

export abstract class UserResource {
  static async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await axios.post("/auth/login/", request);
    return response.data;
  }

  static async registration(request: RegistrationRequest): Promise<never> {
    return await axios.post("/auth/registration/", request);
  }

  static async refresh(request: RefreshRequest): Promise<LoginResponse> {
    const response = await axios.post("/auth/refresh/", request);
    return response.data;
  }
}
