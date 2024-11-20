// src/stores/authStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    user: null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/user/login",
          credentials
        );
        this.accessToken = response.data.accessToken;
        this.refreshToken = response.data.refreshToken;
        this.user = response.data.user;

        localStorage.setItem("accessToken", this.accessToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.accessToken}`;
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      delete axios.defaults.headers.common["Authorization"];
    },
    checkAuth() {
      const accessToken = localStorage.getItem("accessToken");
      if (this.isTokenExpired(accessToken)) {
      } else {
        this.accessToken = accessToken;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
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
