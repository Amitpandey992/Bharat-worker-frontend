import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogContent,
} from "@radix-ui/react-dialog";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAdmin } from "@/context/AdminContext";
import socket from "@/lib/socket";
import { useToast } from "@/components/ui/use-toast";
import { BookingList } from "@/shared/types";

const AdminBookinList = () => {
    const { toast } = useToast();
    const { isLoading } = useAdmin();
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
    const [isAssignOpen, setAssignOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [paginationData, setPaginationData] = useState({
        pageSize: 10,
        currentPage: 1,
    });
    const { bookingData, fetchBookings, setBookingData } = useAdmin();

    useEffect(() => {
        // 👂 Listen for live booking updates
        socket.on("newBookingCreated", (newBooking) => {
            toast({
                title: "New booking received!",
                variant: "default",
            });
            setBookingData((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    bookings: [newBooking, ...prev.bookings],
                };
            });
        });

        // Cleanup listener
        return () => {
            socket.off("newBookingCreated");
        };
    }, []);

    useEffect(() => {
        fetchBookings(paginationData.currentPage, paginationData.pageSize);
    }, [paginationData.currentPage, paginationData.pageSize]);

    console.log(bookingData);

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="text-lg text-muted-foreground">
                        Loading booking history...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            <Card>
                <CardHeader>
                    <CardTitle>Booking History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table
                            pagination={{
                                pageSize: paginationData.pageSize,
                                currentPage: paginationData.currentPage,
                                onPageChange: (page) =>
                                    setPaginationData((prev) => ({
                                        ...prev,
                                        currentPage: page,
                                    })),
                                totalItems:
                                    bookingData?.pagination.totalItems || 0,
                                totalPages:
                                    bookingData?.pagination.totalPages || 0,
                            }}
                        >
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Partner Name</TableHead>
                                    <TableHead>Customer Name</TableHead>
                                    <TableHead>Partner Email</TableHead>
                                    <TableHead>Customer Email</TableHead>

                                    <TableHead>Service</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>TimeSlot</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>TotalAmount</TableHead>
                                    <TableHead>PaymentStatus</TableHead>
                                    <TableHead className="text-end">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bookingData?.bookings?.length &&
                                bookingData?.bookings?.length > 0 ? (
                                    bookingData?.bookings.map(
                                        (
                                            booking: BookingList["bookings"][0]
                                        ) => (
                                            <TableRow key={booking._id}>
                                                <TableCell>
                                                    {booking.partner?.name ||
                                                        "N/A"}
                                                </TableCell>
                                                <TableCell>
                                                    {booking.customer?.name}
                                                </TableCell>
                                                <TableCell>
                                                    {booking.partner?.email ||
                                                        "N/A"}
                                                </TableCell>
                                                <TableCell>
                                                    {booking.customer?.email}
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
                                                              "en-IN"
                                                          )
                                                        : ""}
                                                </TableCell>
                                                <TableCell>
                                                    {booking.location}
                                                </TableCell>
                                                <TableCell>
                                                    {booking.totalAmount}
                                                </TableCell>
                                                <TableCell>
                                                    {booking.paymentStatus}
                                                </TableCell>
                                                <TableCell className="text-end">
                                                    {/* Keep your actions here */}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={11}
                                            className="text-center py-8 text-muted-foreground"
                                        >
                                            No booking history available...
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Dialog
                            open={isRescheduleOpen}
                            onOpenChange={setIsRescheduleOpen}
                        >
                            <DialogPortal>
                                <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
                                <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-semibold">
                                            Reschedule Booking
                                        </h2>
                                        <DialogClose asChild>
                                            <button>
                                                <X className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </DialogClose>
                                    </div>

                                    <input
                                        type="datetime-local"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />

                                    <div className="flex justify-end gap-2">
                                        <DialogClose asChild>
                                            <Button variant="outline">
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            onClick={() => {
                                                setIsRescheduleOpen(false);
                                            }}
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </DialogContent>
                            </DialogPortal>
                        </Dialog>

                        <Dialog
                            open={isAssignOpen}
                            onOpenChange={setAssignOpen}
                        >
                            <DialogPortal>
                                <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
                                <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-semibold">
                                            Assign Booking
                                        </h2>
                                        <DialogClose asChild>
                                            <button>
                                                <X className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </DialogClose>
                                    </div>

                                    <input
                                        type="text"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Partner Name"
                                    />
                                    <input
                                        type="text"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Customer Name"
                                    />

                                    <div className="flex justify-end gap-2">
                                        <DialogClose asChild>
                                            <Button variant="outline">
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            onClick={() => {
                                                setAssignOpen(false);
                                            }}
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </DialogContent>
                            </DialogPortal>
                        </Dialog>

                        <Dialog
                            open={isCancelOpen}
                            onOpenChange={setIsCancelOpen}
                        >
                            <DialogPortal>
                                <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
                                <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-semibold">
                                            Cancel Booking
                                        </h2>
                                        <DialogClose asChild>
                                            <button>
                                                <X className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </DialogClose>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Are you sure you want to cancel this
                                        booking? This action cannot be undone.
                                    </p>
                                    <div className="flex justify-end gap-2">
                                        <DialogClose asChild>
                                            <Button variant="outline">
                                                No
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            variant="destructive"
                                            onClick={() => {
                                                console.log("Booking canceled");
                                                setIsCancelOpen(false);
                                            }}
                                        >
                                            Yes, Cancel
                                        </Button>
                                    </div>
                                </DialogContent>
                            </DialogPortal>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default AdminBookinList;
