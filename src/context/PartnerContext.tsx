<<<<<<< HEAD
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

=======
import { createContext, useContext, useState, ReactNode } from "react";

interface PartnerContextType {
    isLoading: boolean;
>>>>>>> dd102c616386800a531d61326aeefee573eab4d3
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export const PartnerProvider = ({ children }: { children: ReactNode }) => {
<<<<<<< HEAD
const [isLoading, setIsLoading] = useState(false);
   return (
        <PartnerContext.Provider
            value={{ isLoading,  setIsLoading, }}
        >
=======
    const [isLoading, setIsLoading] = useState(false);

    return (
        <PartnerContext.Provider value={{ isLoading }}>
>>>>>>> dd102c616386800a531d61326aeefee573eab4d3
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
