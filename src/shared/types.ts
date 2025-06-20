export type GenericResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

export type LoginResponse = {
  token: string,
  user: {
    id: string,
    name: string,
    role: string
  }
};

export type CustomerType = {
  name: string;
  email: string;
  password: string;
  phone: number;
  role: 'customer';
  _id: string;
};

export type CustomerList = {
  _id:string,
  user: {
    _id:string,
    name:string,
    role:string,
    email: string,
    phone:number,
    isActive: boolean
  },
  "bookingHistory": BookingHistoryType,
  "paymentHistory": paymentHistoryType,
  "complaints": complaintType,
}[]

export type BookingHistoryType = {

}[]
export type paymentHistoryType = {

}[]
export type complaintType = {

}[]



export type AdminaddUser = {
  name: string;
  email: string;
  password: string;
  phone: number;
  isActive: boolean;
  role: 'Customer';
};



export type DocumentType = 'aadharFront' | 'aadharBack' | 'panFront' | 'panBack';

export type DocumentMap = Record<DocumentType, File | null>;

export type PreviewMap = Record<DocumentType, string | null>;

export interface NameDocument {
  id: number;
  file: File | null;
  preview: string | null;
}

export interface DocumentUploadData {
  documents: DocumentMap;
  nameDocs: NameDocument[];
}
