import { axiosInstance } from "@/shared/interceptors";
import { CreateServiceType, GenericResponse } from "@/shared/types";

export class AdminService {
    static async customerList(
        currentPage: number,
        pageSize: number
    ): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.get(
                `/customer/getCustomers?currentPage=${currentPage}&pageSize=${pageSize}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("token") || "''"
                        )}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error("Error during fetching all users data");
        }
    }

    static async addUser(payload: any): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.post(
                "/auth/register",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("token") || "''"
                        )}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.error(error?.response?.data?.message);
            return {
                success: false,
                data: null,
                message: error?.response?.data?.message,
            };
        }
    }

    static async updateUser(
        userId: string,
        payload: any
    ): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.put(
                `/admin/update/${userId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("token") || "''"
                        )}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.error(error?.response?.data?.message);
            return {
                success: false,
                data: null,
                message: error?.response?.data?.message,
            };
        }
    }

    static async deactivateCustomer(
        userId: string
    ): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.put(
                `/admin/update/${userId}`,
                { isActive: false },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("token") || "''"
                        )}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error("Error during user deactivation");
        }
    }

    static async getACustomer(id: string): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.get(
                `/customer/getCustomer/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("token") || "''"
                        )}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching customer");
        }
    }

    static async getBookingsByCustomer(
        id: string,
        currentPage: number,
        pageSize: number
    ): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.get(
                `/booking/allbooking/customer/${id}?currentPage=${currentPage}&pageSize=${pageSize}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("token") || "''"
                        )}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error fetching bookings", error);
            throw new Error("Error fetching booking history");
        }
    }

    static async getServices(): Promise<GenericResponse<any>> {
        try {
            const respones = await axiosInstance.get("/services", {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") || "''"
                    )}`,
                },
            });
            return respones.data;
        } catch (error) {
            console.error("Error fetching services", error);
            throw new Error("Error fetching services");
        }
    }

    static async createService(
        data: CreateServiceType
    ): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.post("/services", data, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") || "''"
                    )}`,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error("Error creating service", error);
            return {
                success: false,
                data: null,
                message:
                    error.respones?.data.message || "Error creating service",
            };
        }
    }

    static async fetchAllCategory(): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.get("/categories", {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") || "''"
                    )}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching category", error);
            throw new Error("Error fetching category");
        }
    }
}