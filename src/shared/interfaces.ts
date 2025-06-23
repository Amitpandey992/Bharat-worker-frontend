export interface PaginatedResponse {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface IBookingData {
    customer: string;
    partner?: string;
    service: string;
    timeSlot: Date;
    location: string;
    totalAmount: number;
    status?: "pending" | "ongoing" | "completed" | "cancelled";
    paymentStatus?: "pending" | "paid" | "failed" | "refunded";
}
