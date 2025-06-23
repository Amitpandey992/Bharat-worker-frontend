import { axiosInstance } from "@/shared/interceptors";
import { Constants } from "@/shared/constants";
import { CustomerBookingList } from "@/shared/types";
import { GenericResponse } from "@/shared/types";

export class AdminService {
    static async customerList(
        currentPage: number,
        pageSize: number
    ): Promise<GenericResponse<any>> {
        try {
            const res = await axiosInstance.get(
                `/customer/getCustomers?currentPage=${currentPage}&pageSize=${pageSize}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("token") || "''"
                        )}`,
                    },
                }
            );
            return res.data;
        } catch (error) {
            console.error(error);
            throw new Error("Error during fetching all users data");
        }
    }

    static async addCustomer(payload: any): Promise<GenericResponse<any>> {
        try {
            const res = await axiosInstance.post("/auth/register", payload, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") || "''"
                    )}`,
                },
            });
            return res.data;
        } catch (error) {
            console.error(error);
            throw new Error("Error during user registration");
        }
    }

    static async updateCustomer(
        userId: string,
        payload: any
    ): Promise<GenericResponse<any>> {
        try {
            const res = await axiosInstance.put(
                `/user/update/${userId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("token") || "''"
                        )}`,
                    },
                }
            );
            return res.data;
        } catch (error) {
            console.error(error);
            throw new Error("Error during user update");
        }
    }

    static async deactivateCustomer(
        userId: string
    ): Promise<GenericResponse<any>> {
        try {
            const res = await axiosInstance.put(
                `/user/update/${userId}`,
                { isActive: false },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("token") || "''"
                        )}`,
                    },
                }
            );
            return res.data;
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

    static async getBookingsByCustomer(customerId: string): Promise<CustomerBookingList[]> {
        try {
            const response = await axiosInstance.get(`/booking/allbooking/customer/${customerId}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem(Constants.LocalStorageSessionKey) || "''")}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error fetching bookings", error);
            throw new Error("Error fetching booking history");
        }
    }
}
