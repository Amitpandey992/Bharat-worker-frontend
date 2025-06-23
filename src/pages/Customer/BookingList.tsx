import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PaginatedResponse } from "@/shared/interfaces";
import { useCustomer } from "@/context/CustomerContext";
import { useAuth } from "@/context/AuthContext";

const BookingList = () => {
    const { getAllBookingByACustomer, isLoading, customerBookingList } =
        useCustomer();
    const { user } = useAuth();
    const [paginationData, setPaginationData] = useState<PaginatedResponse>({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
    });

    if (!user?.id) {
        console.log("User must be loggedIn");
        return;
    }

    useEffect(() => {
        getAllBookingByACustomer(
            user?.id,
            paginationData.currentPage,
            paginationData.pageSize
        );
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    <p className="text-lg text-muted-foreground">
                        Loading customer bookings...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Booking List</CardTitle>
                </CardHeader>

                <CardContent>
                    {customerBookingList?.bookings.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground text-lg">
                            No Bookings found.
                        </div>
                    ) : (
                        <Table
                            pagination={{
                                pageSize: paginationData.pageSize,
                                currentPage: paginationData.currentPage,
                                onPageChange: (page) => {
                                    setPaginationData((prev) => ({
                                        ...prev,
                                        currentPage: page,
                                    }));
                                },
                                totalItems:
                                    customerBookingList?.pagination
                                        .totalItems ?? 0,
                                totalPages:
                                    customerBookingList?.pagination
                                        .totalPages ?? 0,
                            }}
                        >
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Partner Name</TableHead>
                                    <TableHead>Service Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Time slot</TableHead>

                                    <TableHead>Location</TableHead>
                                    <TableHead>Total Amount</TableHead>
                                    <TableHead>Payment status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customerBookingList &&
                                    customerBookingList?.bookings.map(
                                        (booking) => (
                                            <TableRow key={booking._id}>
                                                <TableCell>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="font-medium">
                                                            {booking.partner
                                                                ? booking.partner
                                                                : "No partner assigned"}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {booking.service?.name}
                                                </TableCell>
                                                <TableCell>
                                                    {booking.status}
                                                </TableCell>

                                                <TableCell>
                                                    {booking.timeSlot
                                                        ? new Date(
                                                              booking.timeSlot
                                                          ).toLocaleString(
                                                              "en-US",
                                                              {
                                                                  hour: "numeric",
                                                                  minute: "2-digit",
                                                                  hour12: true,
                                                                  day: "numeric",
                                                                  month: "long",
                                                                  year: "numeric",
                                                              }
                                                          )
                                                        : ""}
                                                </TableCell>
                                                <TableCell>
                                                    {booking.location}
                                                </TableCell>
                                                <TableCell>
                                                    Rs. {""}
                                                    {booking.totalAmount}
                                                </TableCell>
                                                <TableCell>
                                                    {booking.paymentStatus}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default BookingList;
