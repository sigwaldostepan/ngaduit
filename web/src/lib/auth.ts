import { LoginInputSchema } from "@/features/auth/schemas/login-schema";
import { RegisterInputSchema } from "@/features/auth/schemas/register-schema";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { ApiResponse, User } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const register = async (data: RegisterInputSchema) => {
  const response = await api.post("/auth/register", data);

  return response;
};

type UseRegisterOptions = MutationConfig<typeof register>;

export const useRegister = (config: UseRegisterOptions) => {
  return useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: register,
    ...config,
  });
};

type LoginResponse = ApiResponse & User;

const login = async (
  data: LoginInputSchema
): Promise<AxiosResponse<LoginResponse>> => {
  const response = await api.post("/auth/login", data, {
    withCredentials: true,
  });

  return response;
};

type UseLoginOptions = MutationConfig<typeof login>;

export const useLogin = (config: UseLoginOptions) => {
  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: login,
    ...config,
  });
};

const logout = async (): Promise<ApiResponse> => {
  return await api.post("/auth/logout");
};

type UseLogoutOptions = MutationConfig<typeof logout>;

export const useLogout = (config?: UseLogoutOptions) => {
  return useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: logout,
    ...config,
  });
};
