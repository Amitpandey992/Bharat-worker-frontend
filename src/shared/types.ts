export type GenericResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

export type LoginResponse = {
  userId: number;
  emailAddress: string;
  isAdmin: boolean;
  mobileNumber: string | null;
  accessToken: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
};

