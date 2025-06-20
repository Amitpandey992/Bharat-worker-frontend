import { PaginatedPartnerList } from "@/shared/types";
import { PartnerService } from "@/services/partner.service";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface PartnerContextType {
  partnerData: PaginatedPartnerList;
  setPartnerData: Dispatch<SetStateAction<PaginatedPartnerList>>;
  fetchPartnerList: (page: number, limit: number) => Promise<void>;
  updatePartner: (partnerId: string, payload: any) => Promise<void>;
  isLoading: boolean;
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export const PartnerProvider = ({ children }: { children: ReactNode }) => {
  const [partnerData, setPartnerData] = useState<PaginatedPartnerList>({
    success: true,
    data: [],
    message: "",
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchPartnerList = async (page: number, limit: number) => {
    try {
      setIsLoading(true);
      const res = await PartnerService.partnerList(); // If pagination needed, pass page+limit
      setPartnerData(res);
    } catch (err) {
      console.error("Error fetching partner list", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePartner = async (partnerId: string, payload: any) => {
    try {
      setIsLoading(true);
      await PartnerService.updatePartnerSkills(partnerId, payload.skillId, payload);
    } catch (err) {
      console.error("Error updating partner", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PartnerContext.Provider
      value={{
        partnerData,
        setPartnerData,
        fetchPartnerList,
        updatePartner,
        isLoading,
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
};

export function usePartner() {
  const context = useContext(PartnerContext);
  if (context === undefined) {
    throw new Error("usePartner must be used within a PartnerProvider");
  }
  return context;
}
