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

    
}
