import {
  getCookie,
  setCookie,
  removeCookie,
} from "@utils/cookies";

export const getAccessToken = (): string => getCookie("accessToken");
export const getRefreshToken = (): string => getCookie("refreshToken");

export function setAccessToken (accessToken: string) {
  setCookie("accessToken", accessToken, { maxAge: 900 }); // 15 minutes
}
export function setRefreshToken (refreshToken: string) {
  setCookie("refreshToken", refreshToken, { maxAge: 25_92_000 }); // 30 days
}

export function removeAccessToken() {
  removeCookie("accessToken");
}
export function removeRefreshToken() {
  removeCookie("refreshToken");
}
