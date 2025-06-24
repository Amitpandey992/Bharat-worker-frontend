import { AdminService } from "@/services/admin.service";
import { PartnerService } from "@/services/partner.service";
import {
  CustomerList,
  PartnerList,
  GenericResponse,
  CustomerBookingList,
} from "@/shared/types";

import {
  createContext,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  useState,
} from "react";

interface AdminContextType {
  customerData: CustomerList | null;
  setCustomerData: Dispatch<SetStateAction<CustomerList | null>>;
  fetchCustomerList: (currentPage: number, pageSize: number) => Promise<void>;
  addCustomer: (payload: any) => Promise<GenericResponse<any>>;
  updateCustomer: (
    userId: string,
    payload: any
  ) => Promise<GenericResponse<any>>;
  deactivateCustomer: (userId: string) => Promise<void>;
  deactivatePartner: (userId: string) => Promise<void>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  getCustomer: (id: string) => Promise<any>;
  getPartner: (id: string) => Promise<any>;
  partnerData: PartnerList | null;
  setPartnerData: Dispatch<SetStateAction<PartnerList | null>>;
  fetchPartnerList: (currentPage: number, pageSize: number) => Promise<void>;
  updatePartner: (
    partnerId: string,
    skillId: string,
    payload: { skillName: string; yearsOfExperience: number }
  ) => Promise<void>;
  getBookingsByCustomer: (
    id: string,
    currentPage: number,
    pageSize: number
  ) => Promise<void>;
  customerBookingData: CustomerBookingList | null;
  setCustomerBookingData: Dispatch<SetStateAction<CustomerBookingList | null>>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [customerData, setCustomerData] = useState<CustomerList | null>(null);
  const [partnerData, setPartnerData] = useState<PartnerList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customerBookingData, setCustomerBookingData] =
    useState<CustomerBookingList | null>(null);

  async function fetchCustomerList(currentPage: number, pageSize: number) {
    try {
      setIsLoading(true);
      const response = await AdminService.customerList(currentPage, pageSize);
      setCustomerData(response.data);
    } catch (error: any) {
      console.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function addCustomer(payload: any): Promise<GenericResponse<any>> {
    try {
      const response = await AdminService.addCustomer(payload);
      if (!response.success) {
        return response;
      }
      const newCustomer = response.data;
      setCustomerData((prev) =>
        prev
          ? {
              customers: [...prev.customers, newCustomer],
              pagination: prev.pagination,
            }
          : {
              customers: [newCustomer],
              pagination: {
                currentPage: 1,
                pageSize: 10,
                totalItems: 1,
                totalPages: 1,
              },
            }
      );
      return {
        success: true,
        data: newCustomer,
        message: "Customer added successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: error?.response?.data?.message || error.message,
      };
    }
  }

  async function updateCustomer(
    userId: string,
    payload: any
  ): Promise<GenericResponse<any>> {
    try {
      const response = await AdminService.updateCustomer(userId, payload);
      if (!response.success) {
        return response;
      }
      const updatedCustomer = response.data;
      setCustomerData((prev) =>
        prev
          ? {
              ...prev,
              customers: prev.customers.map((customer) =>
                customer.user._id === userId
                  ? { ...customer, user: updatedCustomer }
                  : customer
              ),
            }
          : prev
      );
      return {
        success: true,
        data: updatedCustomer,
        message: "Customer updated successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: error?.response?.data?.message || "An error occurred",
      };
    }
  }

  async function deactivateCustomer(userId: string) {
    try {
      const response = await AdminService.deactivateCustomer(userId);
      const updatedCustomer = response.data;
      setCustomerData((prev) =>
        prev
          ? {
              ...prev,
              customers: prev.customers.map((customer) =>
                customer.user._id === userId
                  ? { ...customer, user: updatedCustomer }
                  : customer
              ),
            }
          : prev
      );
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }

  async function getCustomer(id: string) {
    try {
      setIsLoading(true);
      const response = await AdminService.getACustomer(id);
      return response;
    } catch (error: any) {
      console.error("error fetching customer from AdminContext", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

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
    } catch (err) {
      console.error("Error updating partner skill", err);
    } finally {
      setIsLoading(false);
    }
  };

  const deactivatePartner = async (userId: string) => {
    try {
      setIsLoading(true);
      await AdminService.deactivateCustomer(userId);
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
  }

  const getBookingsByCustomer = async (
    id: string,
    currentPage: number,
    pageSize: number
  ) => {
    try {
      setIsLoading(true);
      const response = await AdminService.getBookingsByCustomer(
        id,
        currentPage,
        pageSize
      );
      setCustomerBookingData(response.data as unknown as CustomerBookingList);
    } catch (error) {
      console.error(error);
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
        setPartnerData,
        fetchPartnerList,
        updatePartner,
        getBookingsByCustomer,
        customerBookingData,
        setCustomerBookingData,
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
