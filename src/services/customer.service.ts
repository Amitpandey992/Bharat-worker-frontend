import { axiosInstance } from "@/shared/interceptors";
import { IBookingData } from "@/shared/interfaces";
import { GenericResponse } from "@/shared/types";

export class CustomerService {
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

    static async createNewBooking(
        data: IBookingData
    ): Promise<GenericResponse<any>> {
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
}
