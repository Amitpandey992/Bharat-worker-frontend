import { CustomerService } from "@/services/customer.service";
import { BookingListForACustomer } from "@/shared/types";
import { createContext, useContext, ReactNode, useState } from "react";

interface CustomerContextType {
    isLoading: boolean;
    createNewBooking: (data: {
        service: string;
        timeSlot: Date;
        location: string;
        totalAmount: number;
    }) => Promise<void>;
    services: any[];
    fetchAllServices: () => Promise<void>;
    getAllBookingByACustomer: (
        id: string,
        currentPage: number,
        pageSize: number
    ) => Promise<void>;
    customerBookingList: BookingListForACustomer | null;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
    undefined
);

export function CustomerProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [customerBookingList, setCustomerBookingList] =
        useState<BookingListForACustomer | null>(null);

    const createNewBooking = async (data: {
        service: string;
        timeSlot: Date;
        location: string;
        totalAmount: number;
    }) => {
        try {
            const response = await CustomerService.createNewBookingByCustomer(
                data
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const fetchAllServices = async () => {
        try {
            setIsLoading(true);
            const response = await CustomerService.fetchServices();
            setServices(response.data);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const getAllBookingByACustomer = async (
        id: string,
        currentPage: number,
        pageSize: number
    ) => {
        setIsLoading(true);
        try {
            const response = await CustomerService.getAllBookingByCustomer(
                id,
                currentPage,
                pageSize
            );
            setCustomerBookingList(response.data);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CustomerContext.Provider
            value={{
                isLoading,
                createNewBooking,
                services,
                fetchAllServices,
                getAllBookingByACustomer,
                customerBookingList,
            }}
        >
            {children}
        </CustomerContext.Provider>
    );
}

export function useCustomer() {
    const context = useContext(CustomerContext);
    if (context === undefined) {
        throw new Error("useCustomer must be used within an CustomerProvider");
    }
    return context;
}
