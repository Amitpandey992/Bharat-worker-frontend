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

export type CustomerType = {
  name: string;
  email: string;
  password: string;
  phone: number;
  role: "customer";
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

export type DocumentType = 'aadharFront' | 'aadharBack' | 'panFront' | 'panBack';


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


export type PartnerList = {
  partners: {
    _id: string;
    user: {
      _id: string;
      name: string;
      role: string;
      email: string;
      phone: number;
      isActive: boolean;
    }
    aadharBack: string | null;
    panFront: string | null;
    panBack: string | null;
    experienceCertificates: string[];
    kycStatus: 'pending' | 'approved' | 'rejected';
    kycRejectionReason: string | null;
    experience: number;
    performanceScore: any[];
    isSuspended: boolean;
    skills: Skill[];
  }[]
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }
}
