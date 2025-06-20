import { CustomerService } from "@/services/customer.service";
import { CustomerList } from "@/shared/types";
import {
    createContext,
    useContext,
    ReactNode,
    SetStateAction,
    Dispatch,
    useState,
} from "react";

interface CustomerContextType {
    customerData: CustomerList;
    setCustomerData: Dispatch<SetStateAction<CustomerList>>;
    fetchCustomerList: (currentPage: number, pageSize: number) => Promise<void>;
    addCustomer: (payload: any) => Promise<void>;
    updateCustomer: (userId: string, payload: any) => Promise<void>;
    deactivateCustomer: (userId: string) => Promise<void>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    getCustomer: (id: string) => Promise<any>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
    undefined
);

export function CustomerProvider({ children }: { children: ReactNode }) {
    const [customerData, setCustomerData] = useState<any>({
        customers: [],
        pagination: {
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
        },
    });
    const [isLoading, setIsLoading] = useState(false);

    async function fetchCustomerList(currentPage: number, pageSize: number) {
        try {
            setIsLoading(true);
            const response = await CustomerService.customerList(
                currentPage,
                pageSize
            );
            setCustomerData(response.data);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    async function addCustomer(payload: any) {
        try {
            setIsLoading(true);
            await CustomerService.addCustomer(payload);
            await fetchCustomerList(
                customerData.pagination.currentPage,
                customerData.pagination.pageSize
            );
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function updateCustomer(userId: string, payload: any) {
        try {
            setIsLoading(true);
            await CustomerService.updateCustomer(userId, payload);
            await fetchCustomerList(
                customerData.pagination.currentPage,
                customerData.pagination.pageSize
            );
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function deactivateCustomer(userId: string) {
        try {
            setIsLoading(true);
            await CustomerService.deactivateCustomer(userId);
            await fetchCustomerList(
                customerData.pagination.currentPage,
                customerData.pagination.pageSize
            );
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function getCustomer(id: string) {
        try {
            setIsLoading(true);
            const response = await CustomerService.getACustomer(id);
            return response;
        } catch (error) {
            console.error(
                "error fetching customer from customerContext",
                error
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function createNewService(
        name: string,
        description: string,
        basePrice: number
    ) {
        try {
            setIsLoading(true);
            const response = await CustomerService.createNewService(
                name,
                description,
                basePrice
            );
            
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CustomerContext.Provider
            value={{
                customerData,
                setCustomerData,
                fetchCustomerList,
                addCustomer,
                updateCustomer,
                deactivateCustomer,
                isLoading,
                setIsLoading,
                getCustomer,
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
