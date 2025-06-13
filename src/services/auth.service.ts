import { axiosInstance } from "@/shared/interceptors";
import { GenericResponse, LoginResponse } from "@/shared/types";

export class AuthService {
  static async login(payload: {
    email: string;
    password: string;
  }): Promise<GenericResponse<LoginResponse>> {
    try {
      const response = await axiosInstance.post("/auth/login", payload);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Login failed");
    }
  }
}
