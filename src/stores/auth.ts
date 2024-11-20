import { defineStore } from "pinia";
import Token from "@/api/Token";
import axios from "@/api/axios";
import router from "@/router";
import { LoginRequest } from "@/api/requests/user/login";
import { RegistrationRequest } from "@/api/requests/user/registration";
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

const tokenLifeTime = 30;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {} as UserType | null,
    token: new Token(),
  }),

  getters: {
    isAuth: (state) => {
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
      await UserResource.login(payload)
        .then((response) => {
          const date = new Date();
          date.setMinutes(date.getMinutes() + tokenLifeTime);
          this.setToken(response.accessToken, response.refreshToken, date);
          window.$message.success("Добро пожаловать");
          router.push({ name: "index" });
        })
        .catch(() => {});
    },

    async registration(payload: RegistrationRequest) {
      await UserResource.registration(payload)
        .then(() => {
          window.$message.success("Успешная регистрация, авторизируйтесь");
        })
        .catch(() => {});
    },

    async refresh() {
      if (
        this.token.getToken() == null ||
        this.token.getRefreshToken() == null
      ) {
        return;
      }
      await UserResource.refresh({
        refreshToken: this.token.getRefreshToken() ?? "",
      })
        .then((response) => {
          const date = new Date();
          date.setMinutes(date.getMinutes() + tokenLifeTime);
          this.setToken(response.accessToken, response.refreshToken, date);
        })
        .catch((error) => {
          console.error("Ошибка обновления токена:", error);
        });
    },
  },
});
