import { CustomerService } from "@/services/customer.service";
import { IBookingData } from "@/shared/interfaces";
import { createContext, useContext, ReactNode, useState } from "react";

interface CustomerContextType {
    isLoading: boolean;
    createNewBooking: (data: IBookingData) => Promise<void>;
    services: any[];
    fetchAllServices: () => Promise<void>
}

const CustomerContext = createContext<CustomerContextType | undefined>(
    undefined
);

export function CustomerProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [services, setServices] = useState([]);
    const createNewBooking = async (data: IBookingData) => {
        try {
            const response = await CustomerService.createNewBooking(data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const fetchAllServices = async () => {
        try {
            setIsLoading(true)
            const response = await CustomerService.fetchServices();
            setServices(response.data);
        } catch (error) {
            console.error(error);
            throw error;
        }finally{
            setIsLoading(false)
        }
    };

    return (
        <CustomerContext.Provider
            value={{
                isLoading,
                createNewBooking,
                services,
                fetchAllServices
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
