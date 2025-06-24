import { Constants } from "@/shared/constants";
import { axiosInstance } from "@/shared/interceptors";
import { GenericResponse } from "@/shared/types";

export class PartnerService {
    static async partnerList(
        currentPage: number,
        pageSize: number
    ): Promise<GenericResponse<any>> {
        try {
            const res = await axiosInstance.get(
                `/partner/getPartners?currentPage=${currentPage}&pageSize=${pageSize} `,
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

    static async updatePartnerSkills(
        partnerId: string,
        skillId: string,
        payload: any
    ): Promise<GenericResponse<any>> {
        try {
            const res = await axiosInstance.put(
                `/partner/updateSkills/partnerId/${partnerId}/skillId/${skillId}`,
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
            throw new Error("Error during partner skill update");
        }
    }

    static async getPartner(id: string): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.get(
                `/partner/getPartner/${id}`,
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

    static async showOpenJobsToPartner(): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.get("/booking/open", {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("token") || "''"
                    )}`,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error(error.message);
            throw new Error("Error fetching open booking");
        }
    }

    static async acceptBooking(
        id: string,
        partnerId: string
    ): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.patch(
                `/booking/${id}/accept`,
                { partnerId },
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
            console.error(error.message);
            throw new Error("Error accepting open booking");
        }
    }

    static async fetchBookingOfAPartner(
        currentPage: number,
        pageSize: number,
        id: string
    ): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.post(
                `/booking/getbooking?currentPage=${currentPage}&pageSize=${pageSize}`,
                { partnerId: id },
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
            console.error(error.message);
            throw new Error("Error fetching booking of a partner");
        }
    }

    static async uploadPartnerDocument(
        data: FormData
    ): Promise<GenericResponse<any>> {
        try {
            const response = await axiosInstance.post(
                "partner/upload-docs",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("token") || "''"
                        )}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.error(error.message);
            throw new Error("Error uploading partner document");
        }
    }
}
