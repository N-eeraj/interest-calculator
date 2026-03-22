import Cookies, {
  type Cookie,
  type CookieSetOptions,
} from "universal-cookie";

const cookies = new Cookies();

export function setCookie(
  name: string,
  value: Cookie,
  { maxAge = 604800 }: Pick<CookieSetOptions, "maxAge"> = {}, // 1 week
) {
  cookies.set(name, value, {
    path: "/",
    maxAge,
  });
};

export function getCookie(name: string) {
  return cookies.get(name);
};

export function removeCookie(name: string) {
  cookies.remove(name, {
    path: "/",
  });
};
