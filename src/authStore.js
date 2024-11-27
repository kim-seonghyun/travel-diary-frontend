// src/stores/authStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      accessToken: null,
      refreshToken: null,
      user: {
        id: null,
        name: null,
        email: null,
        dotori: null,
      },
    };
  },
  getters: {
    userid(state) {
      return state.user.id;
    },
  },
  actions: {
    async login(credentials, router) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/user/login",
          credentials
        );
        this.accessToken = response.data.accessToken;
        this.refreshToken = response.data.refreshToken;
        this.user = response.data.user;
        localStorage.setItem("accessToken", this.accessToken);
        localStorage.setItem("refreshToken", this.refreshToken);
        localStorage.setItem("user", JSON.stringify(this.user));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.accessToken}`;
        router.push("/");
      } catch (error) {
        console.error("Login failed:", error);
        alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
      }
    },
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
    },
    checkAuth() {
      this.accessToken = localStorage.getItem("accessToken");
      this.refreshToken = localStorage.getItem("refreshToken");
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.isTokenExpired(this.accessToken)) {
      } else {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.accessToken}`;
      }
    },
    isTokenExpired(token) {
      if (!token) return true;

      const payload = JSON.parse(atob(token.split(".")[1]));

      const currentTime = Math.floor(Date.now() / 1000);

      return payload.exp < currentTime;
    },
  },
});
