import { PartnerService } from '@/services/partner.service';

import {
    createContext,
    useContext,
    ReactNode,
    SetStateAction,
    Dispatch,
    useState,

} from 'react';

interface PartnerContextType {
  isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    serviceList: any[];

}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export const PartnerProvider = ({ children }: { children: ReactNode }) => {
const [isLoading, setIsLoading] = useState(false);
   return (
        <PartnerContext.Provider
            value={{ isLoading,  setIsLoading, }}
        >
            {children}
        </PartnerContext.Provider>
    );
};

export function usePartner() {
    const context = useContext(PartnerContext);
    if (!context) {
        throw new Error('usePartner must be used within a PartnerProvider');
    }
    return context;
}
