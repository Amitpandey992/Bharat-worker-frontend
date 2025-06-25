import { useState } from "react";
import { motion } from "framer-motion";
import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogContent
} from "@radix-ui/react-dialog";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    Settings2,
    X,
    Info,
    UserPlus,
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

const Services = () => {
    const { isLoading } = useAdmin();
    const [isAddServiceOpen, setAddServiceOpen] = useState(false);
    const [isUpdateServiceOpen, setUpdateServiceOpen] = useState(false);
    const [isDeleteServiceOpen, setDeleteServiceOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="text-lg text-muted-foreground">
                        Loading services...
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
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Service History</CardTitle>
                    <Button onClick={() => setAddServiceOpen(true)}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Service
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Service Name</TableHead>
                                    <TableHead>Service Description</TableHead>
                                    <TableHead className="text-end">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                              
                                <TableRow>
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
                                                    onClick={() => setUpdateServiceOpen(true)}
                                                    className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted rounded-md cursor-pointer"
                                                >
                                                    <Settings2 className="h-4 w-4" />
                                                    Update
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => setDeleteServiceOpen(true)}
                                                    className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted rounded-md cursor-pointer"
                                                >
                                                    <Info className="h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>

                               
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                        No services data available...
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    {/* Add Service Dialog */}
                    <Dialog open={isAddServiceOpen} onOpenChange={setAddServiceOpen}>
                        <DialogPortal>
                            <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
                            <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold">Add New Service</h2>
                                    <DialogClose asChild>
                                        <button>
                                            <X className="h-5 w-5 text-gray-500" />
                                        </button>
                                    </DialogClose>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Service Name"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <input
                                    type="text"
                                    placeholder="Service Description"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <div className="flex justify-end gap-2">
                                    <Button onClick={() => setAddServiceOpen(false)}>Add</Button>
                                </div>
                            </DialogContent>
                        </DialogPortal>
                    </Dialog>

                  
                    <Dialog open={isUpdateServiceOpen} onOpenChange={setUpdateServiceOpen}>
                        <DialogPortal>
                            <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
                            <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold">Update Service</h2>
                                    <DialogClose asChild>
                                        <button>
                                            <X className="h-5 w-5 text-gray-500" />
                                        </button>
                                    </DialogClose>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Service Name"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <input
                                    type="text"
                                    placeholder="Service Description"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <div className="flex justify-end gap-2">
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button onClick={() => setUpdateServiceOpen(false)}>Update</Button>
                                </div>
                            </DialogContent>
                        </DialogPortal>
                    </Dialog>

               
                   <Dialog open={isDeleteServiceOpen} onOpenChange={setDeleteServiceOpen}>
                        <DialogPortal>
                            <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
                            <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold">Delete Service</h2>
                                    <DialogClose asChild>
                                        <button>
                                            <X className="h-5 w-5 text-gray-500" />
                                        </button>
                                    </DialogClose>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Are you sure you want to delete this service? This action cannot be undone.
                                </p>
                                <div className="flex justify-end gap-2">
                                    <DialogClose asChild>
                                        <Button variant="outline">No</Button>
                                    </DialogClose>
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            console.log("Service deleted");
                                            setDeleteServiceOpen(false);
                                        }}
                                    >
                                        Yes, Delete
                                    </Button>
                                </div>
                            </DialogContent>
                        </DialogPortal>
                    </Dialog>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default Services;
