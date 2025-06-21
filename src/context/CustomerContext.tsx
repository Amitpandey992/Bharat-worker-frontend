import { CustomerService } from "@/services/customer.service";
import {
    createContext,
    useContext,
    ReactNode,
    SetStateAction,
    Dispatch,
    useState,
} from "react";

interface CustomerContextType {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    serviceList: any[];
    createNewService: (
        name: string,
        description: string,
        basePrice: number
    ) => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
    undefined
);

export function CustomerProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [serviceList, setServiceList] = useState<any[]>([]);

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
            setServiceList(response.data);
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CustomerContext.Provider
            value={{
                isLoading,
                setIsLoading,
                serviceList,
                createNewService
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
