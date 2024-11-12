import { defineStore } from "pinia";
import Token from "@/utils/auth/Token";
import axios from "@/utils/axios";
import router from "@/router";

interface LoginPayload {
  login: string;
  password: string;
}

interface RegistrationPayload {
  login: string;
  password: string;
}

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
    },

    setToken(accessToken: string, refreshToken: string, expires: Date) {
      this.token = new Token(accessToken, refreshToken, expires);
    },

    async login(payload: LoginPayload) {
      const request = {
        username: payload.login,
        password: payload.password,
      };
      await axios
        .request({
          url: "/auth/login/",
          method: "POST",
          data: request,
        })
        .then((response) => {
          const date = new Date();
          date.setMinutes(date.getMinutes() + 1);
          this.setToken(
            response.data.accessToken,
            response.data.refreshToken,
            date
          );
          window.$message.success("Добро пожаловать");
          router.push({ name: "index" });
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(() => {});
    },

    async registration(payload: RegistrationPayload) {
      const request = {
        username: payload.login,
        password: payload.password,
      };
      await axios
        .request({
          url: "/auth/registration/",
          method: "POST",
          data: request,
        })
        .then(() => {
          window.$message.success("Успешная регистрация, авторизируйтесь");
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(() => {});
    },

    async refresh() {
      if (this.token.getToken() !== null) {
        try {
          console.log("обновляем токен");
          const response = await axios.post("/auth/refresh", {
            refreshToken: this.token.getRefreshToken(),
          });

          const date = new Date();
          date.setMinutes(date.getMinutes() + 1);
          this.setToken(
            response.data.accessToken,
            response.data.refreshToken,
            date
          );
        } catch (error) {
          console.error("Ошибка обновления токена:", error);
        }
      }
    },
  },
});
