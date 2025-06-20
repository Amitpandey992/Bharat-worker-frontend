import { Constants } from "@/shared/constants";
import { axiosInstance } from "@/shared/interceptors";


export class PartnerService{


      static async partnerList() {
        try {
            const res = await axiosInstance.get(
                "/partner/getPartners",
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

      static async updatePartnerSkills(partnerId: string, skillId: string, payload: any) {
    try {
        const res = await axiosInstance.put(
            `/partner/updateSkills/partnerId/${partnerId}/skillId/${skillId}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem(Constants.LocalStorageSessionKey) || "''"
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

}