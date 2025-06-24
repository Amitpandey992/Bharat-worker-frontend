import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import * as Dialog from "@radix-ui/react-dialog";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import { PaginatedResponse } from "@/shared/interfaces";
import {
    MoreHorizontal,
    Settings2,
    X,
    Info,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAdmin } from "@/context/AdminContext";
// import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const AdminBookinList = () => {
    const { isLoading } = useAdmin();
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
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
                        //  pagination={{
                        //         pageSize:pageSize,
                        //         currentPage:currentPage,
                        //         onPageChange: (page) => {
                        //             setPaginationData((prev) => ({
                        //                 ...prev,
                        //                 currentPage: page,
                        //             }));
                        //         },
                        //         totalItems:totalItems,
                        //         totalPages: c,
                            // }}
                        
                        >
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Partner Name</TableHead>
                                    <TableHead>Customer Name</TableHead>
                                    <TableHead>Partner Email</TableHead>
                                    <TableHead>Customer Email</TableHead>
                                    {/* <TableHead>Partner Mobile No.</TableHead>
                  <TableHead>Customer Mobile No.</TableHead> */}
                                    <TableHead>Service</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>TimeSlot</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>TotalAmount</TableHead>
                                    <TableHead>PaymentStatus</TableHead>
                                    <TableHead className="text-end">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* Sample Row */}
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>

                                    {/* Actions dropdown always in the last cell */}
                                    <TableCell className="text-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent
                                                align="end"
                                                className="w-[180px] rounded-md border bg-white p-2 shadow-md z-[999]"
                                            >
                                                <DropdownMenuItem
                                                    className="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap"
                                                >
                                                    {/* <Edit className="mr-2 h-4 w-4" /> */}
                                                    <Settings2 className="mr-2 h-4 w-4" />

                                                    Assign
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={() => setIsRescheduleOpen(true)}
                                                    className="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap"
                                                >
                                                    <Settings2 className="mr-2 h-4 w-4" />
                                                    Reschedule
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    className="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap"
                                                >
                                                    <Info className="mr-2 h-4 w-4" />
                                                    {/* <Settings2 className="mr-2 h-4 w-4" /> */}

                                                    Cancel
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>

                                {/* Empty state row */}
                                <TableRow>
                                    <TableCell
                                        colSpan={10}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No booking history available...
                                    </TableCell>
                                </TableRow>
                            </TableBody>

                        </Table>
                        <Dialog.Root open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
                            <Dialog.Portal>
                                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
                                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-semibold">Reschedule Booking</h2>
                                        <Dialog.Close asChild>
                                            <button>
                                                <X className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </Dialog.Close>
                                    </div>

                                    <input
                                        type="datetime-local"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    />

                                    <div className="flex justify-end gap-2">
                                        <Dialog.Close asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </Dialog.Close>
                                        <Button
                                            onClick={() => {
                                                // ✅ Handle submit logic here
                                                setIsRescheduleOpen(false);
                                            }}
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default AdminBookinList;
