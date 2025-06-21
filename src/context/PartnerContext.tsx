import {
    createContext,
    useContext,
    useState,
    ReactNode,

} from 'react';

interface PartnerContextType {

}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export const PartnerProvider = ({ children }: { children: ReactNode }) => {


    const [isLoading, setIsLoading] = useState(false);



    return (
        <PartnerContext.Provider
            value={{ isLoading }}
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