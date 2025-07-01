import { axiosInstance } from "@/shared/interceptors";
import { CategoryType, CreateServiceType, GenericResponse } from "@/shared/types";

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
        } catch (error: any) {
            console.error("Error fetching customer", error);
            return {
                success: false,
                data: null,
                message:
                    error.respones?.data.message || "Error fetching customer",
            };
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
        } catch (error: any) {
            console.error("Error fetching bookings", error);
            return {
                success: false,
                data: null,
                message:
                    error.respones?.data.message || "Error fetching bookings",
            };
        }
    }

    //services
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
        } catch (error: any) {
            console.error("Error fetching service", error);
            return {
                success: false,
                data: null,
                message:
                    error.respones?.data.message || "Error fetching service",
            };
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

    static async updateService(
        id: string,
        data: CreateServiceType
    ): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.put(`services/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") || "''"
                    )}`,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error("Error updating service", error);
            return {
                success: false,
                data: null,
                message:
                    error.respones?.data.message || "Error updating service",
            };
        }
    }

    static async deleteService(id: string): Promise<GenericResponse<any>> {
        try {
            const respones = await axiosInstance.delete(`/services/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") || "''"
                    )}`,
                },
            });
            return respones.data;
        } catch (error: any) {
            console.error("Error deleting service", error);
            return {
                success: false,
                data: null,
                message:
                    error.respones?.data.message || "Error deleting service",
            };
        }
    }
    // category
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
        } catch (error: any) {
            console.error("Error fetching categories", error);
            return {
                success: false,
                data: null,
                message:
                    error.respones?.data.message || "Error fetching categories",
            };
        }
    }

    // bookings
    static async fetchBookings(
        currentPage: number,
        pageSize: number
    ): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.get(
                `/booking?currentPage=${currentPage}&pageSize=${pageSize}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("token") || "''"
                        )}`,
                    },
                }
            );
            return response.data;
        } catch (error: unknown) {
            console.error(error);
            const err = error as any;
            return {
                success: false,
                data: null,
                message: err.respones?.data.message,
            }
        }
    }

    static async createCategory(
        data: CategoryType
    ): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.post("/categories", data, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") || "''"
                    )}`,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error("Error creating categories ", error);
            return {
                success: false,
                data: null,
                message:
                    error.respones?.data.message || "Error creating category",
            };
        }
    }

    static async updateCategory(
        id: string,
        data: CategoryType
    ): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.put(`/categories/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") || "''"
                    )}`,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error("Error updating category", error);
            return {
                success: false,
                data: null,
                message:
                    error.respones?.data.message || "Error updating category",
            };
        }
    }

    static async deleteCategory(id: string): Promise<GenericResponse<any>> {
        try {
            const respones = await axiosInstance.delete(`/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") || "''"
                    )}`,
                },
            });
            return respones.data;
        } catch (error: any) {
            console.error("Error deleting category", error);
            return {
                success: false,
                data: null,
                message:
                    error.respones?.data.message || "Error deleting category",
            };
        }
    }
}
