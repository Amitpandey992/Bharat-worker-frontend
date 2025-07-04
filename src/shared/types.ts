export type GenericResponse<T> = {
    success: boolean;
    data: T;
    message: string;
};

export type LoginResponse = {
    token: string;
    user: {
        id: string;
        name: string;
        role: string;
    };
};

// customer
export type CustomerType = {
    name: string;
    email: string;
    password: string;
    phone: number;
    role: "customer";
    isActive: boolean;
    _id: string;
};

export type CustomerList = {
    customers: {
        _id: string;
        user: {
            _id: string;
            name: string;
            role: string;
            email: string;
            phone: number;
            isActive: boolean;
        };
        bookingHistory: BookingHistoryType;
        paymentHistory: paymentHistoryType;
        complaints: complaintType;
    }[];
    pagination: {
        currentPage: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
};

export type BookingHistoryType = {}[];
export type paymentHistoryType = {}[];
export type complaintType = {}[];

export type AdminaddUser = {
    name: string;
    email: string;
    password: string;
    phone: number;
    isActive: boolean;
    role: "Customer";
};

// partner
export type DocumentType =
    | "aadharFront"
    | "aadharBack"
    | "panFront"
    | "panBack";

export type DocumentMap = {
    [key in DocumentType]: File | null;
};

export type PreviewMap = {
    [key in DocumentType]: string | null;
};

export interface NameDocument {
    id: number;
    file: File | null;
    preview: string | null;
}

export interface DocumentUploadData {
    documents: DocumentMap;
    nameDocs: NameDocument[];
}

export type Skill = {
    skillName: string;
    yearsOfExperience: number;
    _id: string;
};

export type PartnerListType = {
    partners: {
        _id: string;
        user: {
            _id: string;
            name: string;
            role: string;
            email: string;
            phone: number;
            isActive: boolean;
        };
        aadharBack: string | null;
        panFront: string | null;
        panBack: string | null;
        experienceCertificates: string[];
        kycStatus: "pending" | "approved" | "rejected";
        kycRejectionReason: string | null;
        experience: number;
        performanceScore: any[];
        isSuspended: boolean;
        skills: Skill[];
    }[];
    pagination: {
        currentPage: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
};

// bookings
export type BookingList = {
    bookings: {
        _id: string;
        customer: {
            _id: string;
            name: string;
            role: string;
            email: string;
            phone: string;
            isActive: boolean;
        };
        partner: {
            _id: string;
            name: string;
            role: string;
            email: string;
            phone: string;
            isActive: boolean;
        };
        service: {
            _id: string;
            name: string;
        };
        status: string;
        timeSlot: string;
        location: string;
        totalAmount: number;
        paymentStatus: string;
        createdAt: string;
    }[];

    pagination: {
        currentPage: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
}

export type BookingListForACustomer = {
    bookings: {
        _id: string;
        customer: {
            _id: string;
            name: string;
            role: string;
            email: string;
            phone: string;
            isActive: boolean;
        };
        partner: string | null;
        service: {
            _id: string;
            name: string;
        };
        status: string;
        timeSlot: Date;
        location: string;
        totalAmount: number;
        paymentStatus: string;
    }[];
    pagination: {
        currentPage: 1;
        pageSize: 10;
        totalItems: 6;
        totalPages: 1;
    };
};

export type OpenBookingDataForPartner = {
    _id: string;
    customer: {
        _id: string;
        name: string;
        email: string;
        phone: string;
    };
    partner: string | null;
    service: {
        _id: string;
        name: string;
        description: string;
    };
    status: string;
    timeSlot: string;
    location: string;
    totalAmount: number;
    paymentStatus: string;
    createdAt: string;
    __v: number;
}[];

export type BookingDataForPartner = {
    bookings: {
        _id: string;
        customer: {
            _id: string;
            name: string;
            email: string;
            phone: string;
        };
        partner: string | null;
        service: {
            _id: string;
            name: string;
            description: string;
        };
        status: string;
        timeSlot: string;
        location: string;
        totalAmount: number;
        paymentStatus: string;
        createdAt: string;
        __v: number;
    }[];
    pagination: {
        currentPage: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
};


// category
export type CategoryType = {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}[];

// services
export type CreateServiceType = {
    name: string;
    description: string;
    category: string;
    pricingTiers: {
        name: string;
        price: number;
    }[];

    surgePricing: {
        enabled: boolean;
        surgeMultiplier: number;
        surgeHours: {
            start: string;
            end: string;
        }[];
    };
    partnerCommissionRate: number;
};

export type ServiceType = {
    services: {
        surgePricing: {
            enabled: boolean;
            surgeMultiplier: number;
            surgeHours: {
                start: string;
                end: string;
            }[];
        };
        _id: string;
        name: string;
        description: string;
        category: {
            _id: string;
            name: string;
            createdAt: string;
            updatedAt: string;
        };
        pricingTiers: {
            name: string;
            price: number;
            _id: string;
        }[];
        partnerCommissionRate: number;
        createdAt: string;
        updatedAt: string;
    }[];
    pagination: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
    };
};
