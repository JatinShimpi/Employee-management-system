import axios from "axios";
import { jwtDecode } from "jwt-decode";

const authApiUrl = import.meta.env.VITE_AUTH_API;

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${authApiUrl}/signin`, {
    username,
    password,
  });
  return response;
};

export const SignUp = async (
  username: string,
  password: string,
  email: string,
  roles: string[]
) => {
  const response = await axios.post(`${authApiUrl}/signup`, {
    username,
    email,
    roles,
    password,
  });
  return response;
};

export const refreshToken = async (
  username: string,
  password: string
): Promise<string> => {
  const response = await axios.post(`${authApiUrl}/signin`, {
    username,
    password,
  });
  return response.data.accessToken;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (err) {
    if (err instanceof Error) {
      return true; // TypeScript ensures `err` is correctly typed
    }
    return true;
  }
};

const TOKEN_KEY = "authToken";

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};
