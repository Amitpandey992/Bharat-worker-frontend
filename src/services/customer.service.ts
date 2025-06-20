import { Constants } from "@/shared/constants";
import { axiosInstance } from "@/shared/interceptors";

export class CustomerService {
    static async customerList(currentPage: number, pageSize: number) {
        try {
            const res = await axiosInstance.get(
                `/customer/getCustomers?currentPage=${currentPage}&pageSize=${pageSize}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem(
                                Constants.LocalStorageSessionKey
                            ) || "''"
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

    static async addCustomer(payload: any) {
        try {
            const res = await axiosInstance.post("/auth/register", payload, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem(
                            Constants.LocalStorageSessionKey
                        ) || "''"
                    )}`,
                },
            });
            return res.data;
        } catch (error) {
            console.error(error);
            throw new Error("Error during user registration");
        }
    }

    static async updateCustomer(userId: string, payload: any) {
        try {
            const res = await axiosInstance.put(
                `/user/update/${userId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem(
                                Constants.LocalStorageSessionKey
                            ) || "''"
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

    static async deactivateCustomer(userId: string) {
        try {
            const res = await axiosInstance.put(
                `/user/update/${userId}`,
                { isActive: false },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem(
                                Constants.LocalStorageSessionKey
                            ) || "''"
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

    static async getACustomer(id: string) {
        try {
            const response = await axiosInstance.get(
                `/customer/getCustomer/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem(
                                Constants.LocalStorageSessionKey
                            ) || "''"
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
}
