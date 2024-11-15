import { defineStore } from "pinia";
import Token from "@/api/Token";
import axios from "@/api/axios";
import router from "@/router";
import { LoginRequest } from "@/api/requests/login";
import { RegistrationRequest } from "@/api/requests/registration";
import { UserResource } from "@/api/resources/user";

interface UserType {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {} as UserType | null,
    token: new Token(),
  }),

  getters: {
    isAuth: (state) => {
      console.log(state.token);
      console.log(state.token.isTokenFresh());
      return state.token.isTokenFresh();
    },
  },

  actions: {
    logout() {
      this.user = null;
      this.token.remove();
      window.location.replace("/auth");
    },

    setToken(accessToken: string, refreshToken: string, expires: Date) {
      this.token = new Token(accessToken, refreshToken, expires);
    },

    async login(payload: LoginRequest) {
      await UserResource.login({
        username: payload.username,
        password: payload.password,
      } as LoginRequest)
        .then((response) => {
          const date = new Date();
          date.setMinutes(date.getMinutes() + 1);
          this.setToken(response.accessToken, response.refreshToken, date);
          window.$message.success("Добро пожаловать");
          router.push({ name: "index" });
        })
        .catch(() => {});
    },

    async registration(payload: RegistrationRequest) {
      await UserResource.registration({
        username: payload.username,
        password: payload.password,
      } as RegistrationRequest)
        .then(() => {
          window.$message.success("Успешная регистрация, авторизируйтесь");
        })
        .catch(() => {});
    },

    async refresh() {
      if (this.token.getToken() !== null) {
        console.log("обновляем токен");
        await axios
          .post("/auth/refresh/", {
            refreshToken: this.token.getRefreshToken(),
          })
          .then((response) => {
            console.log(response.data);
            const date = new Date();
            date.setMinutes(date.getMinutes() + 1);
            this.setToken(
              response.data.accessToken,
              response.data.refreshToken,
              date
            );
          })
          .catch((error) => {
            console.error("Ошибка обновления токена:", error);
          });
      }
    },
  },
});
