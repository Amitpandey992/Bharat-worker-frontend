import { axiosInstance } from "@/shared/interceptors";
import { Constants } from "@/shared/constants";
import { CustomerBookingList } from "@/shared/types";

export class CustomerBooking {
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
