import { PartnerService } from "@/services/partner.service";
import {
    BookingDataForPartner,
    OpenBookingDataForPartner,
} from "@/shared/types";
import { createContext, useContext, useState, ReactNode } from "react";

interface PartnerContextType {
    isLoading: boolean;
    fetchOpenJobs: () => Promise<void>;
    fetchedJobData: OpenBookingDataForPartner | null;
    acceptOpenJob: (id: string, partnerId: string) => Promise<void>;
    fetchAllBookingOfAPartner: (
        currentPage: number,
        page: number,
        id: string
    ) => Promise<void>;
    fetchPartnerBookings: BookingDataForPartner | null;
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export const PartnerProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedJobData, setFetchedJobData] =
        useState<OpenBookingDataForPartner | null>(null);
    const [fetchPartnerBookings, setFetchPartnerBookings] =
        useState<BookingDataForPartner | null>(null);

    const fetchOpenJobs = async () => {
        try {
            setIsLoading(true);
            const response = await PartnerService.showOpenJobsToPartner();
            setFetchedJobData(response.data);
        } catch (error: any) {
            console.error(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const acceptOpenJob = async (id: string, partnerId: string) => {
        try {
            setIsLoading(true);
            await PartnerService.acceptBooking(id, partnerId);
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllBookingOfAPartner = async (
        currentPage: number,
        pageSize: number,
        id: string
    ) => {
        try {
            setIsLoading(true);
            const response = await PartnerService.fetchBookingOfAPartner(
                currentPage,
                pageSize,
                id
            );
            setFetchPartnerBookings(response.data);
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <PartnerContext.Provider
            value={{
                isLoading,
                fetchOpenJobs,
                fetchedJobData,
                acceptOpenJob,
                fetchAllBookingOfAPartner,
                fetchPartnerBookings,
            }}
        >
            {children}
        </PartnerContext.Provider>
    );
};

export function usePartner() {
    const context = useContext(PartnerContext);
    if (!context) {
        throw new Error("usePartner must be used within a PartnerProvider");
    }
    return context;
}
