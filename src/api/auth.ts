import { request } from "./client";
import type { AuthResponse, User } from "../types/auth";

export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  return request<AuthResponse, { email: string; password: string }>(
    "/api/auth/login",
    {
      method: "POST",
      body: { email, password },
    },
  );
}

export async function register(
  email: string,
  password: string,
): Promise<AuthResponse> {
  return request<AuthResponse, { email: string; password: string }>(
    "/api/auth/register",
    {
      method: "POST",
      body: { email, password },
    },
  );
}

export async function getMe(token: string): Promise<User> {
  return request<User>("/api/users/me", {
    method: "GET",
    token,
  });
}

export async function refresh(): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/refresh", {
    method: "POST",
  });
}

export async function logout(): Promise<{ ok: boolean }> {
  return request<{ ok: boolean }>("/api/auth/logout", {
    method: "POST",
  });
}
