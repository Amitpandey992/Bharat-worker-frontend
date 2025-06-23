import { axiosInstance } from "@/shared/interceptors";
import { GenericResponse } from "@/shared/types";

export class CustomerService {
    // static async createNewService(data: {
    //     name: string;
    //     description: string;
    //     basePrice: number;
    //     location: string;
    // }): Promise<GenericResponse<any>> {
    //     try {
    //         const response = await axiosInstance.post(
    //             "/service/createService",
    //             data,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${JSON.parse(
    //                         localStorage.getItem(
    //                             Constants.LocalStorageSessionKey
    //                         ) || "''"
    //                     )}`,
    //                 },
    //             }
    //         );
    //         return response.data;
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error("Error during creating new service");
    //     }
    // }

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
        id: string
    ): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.get(
                `/booking/allbooking/customer/${id}`
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error("Error fetching booking by a customer");
        }
    }
}
