import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogContent} from "@radix-ui/react-dialog";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const AdminBookinList = () => {
    const { isLoading } = useAdmin();
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
    const [isAssignOpen, setAssignOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);

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
                        <Table>
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
                                                    onClick={() => setAssignOpen(true)}
                                                    className="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap"
                                                >
                                                    
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
                                                onClick={()=>setIsCancelOpen(true)}
                                                    className="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap"
                                                >
                                                    <Info className="mr-2 h-4 w-4" />
                                                   

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
                        {/* ✅ Reschedule Dialog */}
<Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
    <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Reschedule Booking</h2>
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
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                    onClick={() => {
                        // ✅ Handle submit logic here
                        setIsRescheduleOpen(false);
                    }}
                >
                    Confirm
                </Button>
            </div>
        </DialogContent>
    </DialogPortal>
</Dialog>

{/* ✅ Assign Dialog - fixed to use isAssignOpen */}
<Dialog open={isAssignOpen} onOpenChange={setAssignOpen}>
    <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Assign Booking</h2>
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
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                    onClick={() => {
                        // ✅ Handle submit logic here
                        setAssignOpen(false);
                    }}
                >
                    Confirm
                </Button>
            </div>
        </DialogContent>
    </DialogPortal>
</Dialog>

<Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
    <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Cancel Booking</h2>
                <DialogClose asChild>
                    <button>
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </DialogClose>
            </div>
            <p className="text-sm text-muted-foreground">
                Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
                <DialogClose asChild>
                    <Button variant="outline">No</Button>
                </DialogClose>
                <Button
                    variant="destructive"
                    onClick={() => {
                        // ✅ Handle cancel logic here
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
