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
  fetchCustomerList: () => Promise<void>;
  addCustomer: (payload: any) => Promise<void>;
  updateCustomer: (userId: string, payload: any) => Promise<void>;
  deactivateCustomer: (userId: string) => Promise<void>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}


const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customerData, setCustomerData] = useState<CustomerList>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCustomerList() {
    try {
      setIsLoading(true);
      const response = await CustomerService.customerList();
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
      await fetchCustomerList(); 
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
      await fetchCustomerList(); // refresh list after update
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
      await fetchCustomerList(); // refresh list after deactivate
    } catch (error) {
      console.error(error);
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
