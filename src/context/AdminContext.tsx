import { CustomerService } from "@/services/customer.service";
import { PartnerService } from "@/services/partner.service";
import { CustomerList, PartnerList } from "@/shared/types";
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
  deactivatePartner: (userId: string) => Promise<void>; // 🛠️ Added missing declaration
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  getCustomer: (id: string) => Promise<any>;
  getPartner: (id: string) => Promise<any>;
  partnerData: PartnerList;
  fetchPartnerList: (currentPage: number, pageSize: number) => Promise<void>;
  updatePartner: (
    partnerId: string,
    skillId: string,
    payload: { skillName: string; yearsOfExperience: number }
  ) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [customerData, setCustomerData] = useState<CustomerList>({
    customers: [],
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    },
  });

  const [partnerData, setPartnerData] = useState<PartnerList>({
    partners: [],
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Customer related actions
  async function fetchCustomerList(currentPage: number, pageSize: number) {
    try {
      setIsLoading(true);
      const response = await CustomerService.customerList(currentPage, pageSize);
      setCustomerData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addCustomer(payload: any) {
    try {
      setIsLoading(true);
      await CustomerService.addCustomer(payload);
      await fetchCustomerList(customerData.pagination.currentPage, customerData.pagination.pageSize);
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
      await fetchCustomerList(customerData.pagination.currentPage, customerData.pagination.pageSize);
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
      await fetchCustomerList(customerData.pagination.currentPage, customerData.pagination.pageSize);
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
      console.error("error fetching customer from AdminContext", error);
    } finally {
      setIsLoading(false);
    }
  }

  // 🔹 Partner related actions
  const fetchPartnerList = async (page: number, limit: number) => {
    try {
      setIsLoading(true);
      const response = await PartnerService.partnerList(page, limit);
      setPartnerData(response.data);
    } catch (err) {
      console.error("Error fetching partner list", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePartner = async (
    partnerId: string,
    skillId: string,
    payload: { skillName: string; yearsOfExperience: number }
  ) => {
    try {
      setIsLoading(true);
      await PartnerService.updatePartnerSkills(partnerId, skillId, payload);
      await fetchPartnerList(partnerData.pagination.currentPage, partnerData.pagination.pageSize); 
    } catch (err) {
      console.error("Error updating partner skill", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🛠️ Stub for deactivatePartner (you can wire this up with a service call)
  const deactivatePartner = async (userId: string) => {
    try {
      setIsLoading(true);
      await CustomerService.deactivateCustomer(userId); // You can change this to PartnerService if needed
    } catch (err) {
      console.error("Error deactivating partner", err);
    } finally {
      setIsLoading(false);
    }
  };

 async function getPartner(id: string) {
    try {
      setIsLoading(true);
      const response = await PartnerService.getPartner(id);
      return response;
    } catch (error) {
      console.error("Error fetching partner", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        customerData,
        setCustomerData,
        fetchCustomerList,
        addCustomer,
        updateCustomer,
        deactivateCustomer,
        deactivatePartner,
        isLoading,
        setIsLoading,
        getCustomer,
        getPartner,
        partnerData,
        fetchPartnerList,
        updatePartner,
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
