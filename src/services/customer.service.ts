import { axiosInstance } from "@/shared/interceptors";
import { GenericResponse } from "@/shared/types";

export class CustomerService {
    static async createNewBookingByCustomer(data: {
        service: string;
        timeSlot: Date;
        location: string;
        totalAmount: number;
    }): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.post(
                "/booking/createBookingByCustomer",
                data,
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

    static async fetchServices(): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.get("/service/getAllService", {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") || "''"
                    )}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching services");
        }
    }

    static async getAllBookingByCustomer(
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
            console.error(error);
            throw new Error("Error fetching booking by a customer");
        }
    }
}
