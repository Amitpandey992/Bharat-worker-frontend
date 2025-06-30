import { AdminService } from "@/services/admin.service";
import { PartnerService } from "@/services/partner.service";
import {
    CustomerList,
    PartnerListType,
    GenericResponse,
    BookingListForACustomer,
    ServiceType,
    CategoryType,
    CreateServiceType,
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
    fetchCustomerList: (currentPage: number, pageSize: number) => Promise<void>;
    addUser: (payload: any) => Promise<GenericResponse<any>>;
    updateUser: (userId: string, payload: any) => Promise<GenericResponse<any>>;
    deactivateCustomer: (userId: string) => Promise<void>;
    deactivatePartner: (userId: string) => Promise<void>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    getCustomer: (id: string) => Promise<any>;
    getPartner: (id: string) => Promise<any>;
    partnerData: PartnerListType | null;
    setPartnerData: Dispatch<SetStateAction<PartnerListType | null>>;
    fetchPartnerList: (currentPage: number, pageSize: number) => Promise<void>;
    updatePartnerSkill: (
        partnerId: string,
        skillId: string,
        payload: { skillName: string; yearsOfExperience: number }
    ) => Promise<void>;
    getBookingsByCustomer: (
        id: string,
        currentPage: number,
        pageSize: number
    ) => Promise<void>;
    customerBookingData: BookingListForACustomer | null;
    fetchServices: () => Promise<void>;
    serviceData: ServiceType | null;
    fechCategories: () => Promise<void>;
    categoryData: CategoryType | null;
    createService: (data: CreateServiceType) => Promise<void>;
    updateService: (
        id: string,
        data: CreateServiceType
    ) => Promise<GenericResponse<any>>;
    deleteService: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
    const [customerData, setCustomerData] = useState<CustomerList | null>(null);
    const [partnerData, setPartnerData] = useState<PartnerListType | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [customerBookingData, setCustomerBookingData] =
        useState<BookingListForACustomer | null>(null);
    const [serviceData, setServiceData] = useState<ServiceType | null>(null);
    const [categoryData, setCategoryData] = useState<CategoryType | null>(null);

    async function fetchCustomerList(currentPage: number, pageSize: number) {
        try {
            setIsLoading(true);
            const response = await AdminService.customerList(
                currentPage,
                pageSize
            );
            setCustomerData(response.data);
        } catch (error: any) {
            console.error(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    async function addUser(payload: any): Promise<GenericResponse<any>> {
        try {
            const response = await AdminService.addUser(payload);
            if (!response.success) {
                return response;
            }
            const newUser = response.data;
            setCustomerData((prev) =>
                prev
                    ? {
                          ...prev,
                          customers: [...prev.customers, newUser],
                      }
                    : prev
            );
            setPartnerData((prev) =>
                prev
                    ? {
                          ...prev,
                          partners: [...prev.partners, newUser],
                      }
                    : prev
            );
            return {
                success: true,
                data: newUser,
                message: "User added successfully",
            };
        } catch (error: any) {
            return {
                success: false,
                data: null,
                message: error?.response?.data?.message || error.message,
            };
        }
    }

    async function updateUser(
        userId: string,
        payload: any
    ): Promise<GenericResponse<any>> {
        try {
            const response = await AdminService.updateUser(userId, payload);
            if (!response.success) {
                return response;
            }
            const updatedUser = response.data;
            setCustomerData((prev) =>
                prev
                    ? {
                          ...prev,
                          customers: prev.customers.map((customer) =>
                              customer?.user?._id === userId
                                  ? { ...customer, user: updatedUser }
                                  : customer
                          ),
                      }
                    : prev
            );

            setPartnerData((prev) =>
                prev
                    ? {
                          ...prev,
                          partners: prev.partners.map((partner) =>
                              partner.user._id === userId
                                  ? { ...partner, user: updatedUser }
                                  : partner
                          ),
                      }
                    : prev
            );
            return {
                success: true,
                data: updatedUser,
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
            console.error(
                "error fetching customer from AdminContext",
                error.message
            );
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const fetchPartnerList = async (currentPage: number, pageSize: number) => {
        try {
            setIsLoading(true);
            const response = await PartnerService.partnerList(
                currentPage,
                pageSize
            );
            setPartnerData(response.data);
        } catch (err) {
            console.error("Error fetching partner list", err);
        } finally {
            setIsLoading(false);
        }
    };

    const updatePartnerSkill = async (
        partnerId: string,
        skillId: string,
        payload: { skillName: string; yearsOfExperience: number }
    ) => {
        try {
            await PartnerService.updatePartnerSkills(
                partnerId,
                skillId,
                payload
            );
        } catch (err) {
            console.error("Error updating partner skill", err);
        }
    };

    const deactivatePartner = async (userId: string) => {
        try {
            await AdminService.deactivateCustomer(userId);
        } catch (err) {
            console.error("Error deactivating partner", err);
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
            console.log(response.data);
            setCustomerBookingData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchServices = async () => {
        try {
            setIsLoading(true);
            const response = await AdminService.getServices();
            setServiceData(response.data);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const fechCategories = async () => {
        try {
            const response = await AdminService.fetchAllCategory();
            console.log(response);
            setCategoryData(response.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const createService = async (data: CreateServiceType) => {
        try {
            const response = await AdminService.createService(data);
            setServiceData((prev) =>
                prev
                    ? {
                          ...prev,
                          services: [...prev.services, response.data],
                          pagination: {
                              ...prev.pagination,
                              totalItems: prev.pagination.totalItems + 1,
                              totalPages: Math.ceil(
                                  (prev.pagination.totalItems + 1) /
                                      prev.pagination.pageSize
                              ),
                          },
                      }
                    : {
                          services: [response.data],
                          pagination: {
                              currentPage: 1,
                              pageSize: 10,
                              totalPages: 1,
                              totalItems: 1,
                          },
                      }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const updateService = async (id: string, data: CreateServiceType) => {
        try {
            const response = await AdminService.updateService(id, data);
            setServiceData((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    services: prev.services.map((service) =>
                        service._id === id ? response.data : service
                    ),
                };
            });
            return response;
        } catch (error) {
            console.error("error updating services", error);
            throw error;
        }
    };

    const deleteService = async (id: string) => {
        try {
            await AdminService.deleteService(id);
            setServiceData((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    services: prev.services.filter(
                        (service) => service._id !== id
                    ),
                };
            });
        } catch (error) {
            console.error("error updating services", error);
            throw error;
        }
    };

    return (
        <AdminContext.Provider
            value={{
                customerData,
                fetchCustomerList,
                addUser,
                updateUser,
                deactivateCustomer,
                deactivatePartner,
                isLoading,
                setIsLoading,
                getCustomer,
                getPartner,
                partnerData,
                setPartnerData,
                fetchPartnerList,
                updatePartnerSkill,
                getBookingsByCustomer,
                customerBookingData,
                fetchServices,
                serviceData,
                fechCategories,
                categoryData,
                createService,
                updateService,
                deleteService,
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
