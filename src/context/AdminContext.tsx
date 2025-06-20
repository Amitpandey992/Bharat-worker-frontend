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

interface AdminContextType {
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

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
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

    

    return (
        <AdminContext.Provider
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
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
}
