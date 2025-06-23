import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useCustomer } from "@/context/CustomerContext";

const BookingList = () => {
    const [paginationData, setPaginationData] = useState<PaginatedResponse>({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
    });

    const { isLoading } = useCustomer();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    <p className="text-lg text-muted-foreground">
                        Loading customers...
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
                    <CardTitle>Customer List</CardTitle>
                </CardHeader>

                <CardContent>
                    {/* {customerData.customers.length === 0 ? ( */}
                    <div className="text-center py-12 text-muted-foreground text-lg">
                        No customers found.
                    </div>
                    {/* ) : ( */}
                    <Table
                    // pagination={{
                    //     pageSize: paginationData.pageSize,
                    //     currentPage: paginationData.currentPage,
                    //     onPageChange: (page) => {
                    //         setPaginationData((prev) => ({
                    //             ...prev,
                    //             currentPage: page,
                    //         }));
                    //     },
                    //     totalItems: customerData.pagination.totalItems,
                    //     totalPages: customerData.pagination.totalPages,
                    // }}
                    >
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer Name</TableHead>
                                <TableHead>Customer Email</TableHead>
                                <TableHead>Customer Mobile No.</TableHead>

                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* {customerData.customers.map( */}
                            {/* (userObj, index) => ( */}
                            <TableRow>
                                <TableCell>
                                    <div className="flex items-center space-x-3">
                                        {/* <Avatar>
                                                        <AvatarFallback className="bg-blue-500 text-white">
                                                            {userObj.user?.name
                                                                ?.slice(0, 2)
                                                                .toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar> */}
                                        <span className="font-medium">
                                            {/* {userObj.user?.name} */}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {/* {userObj.user?.email} */}
                                </TableCell>
                                <TableCell>
                                    {/* {userObj.user?.phone} */}
                                </TableCell>

                                <TableCell>
                                    {/* {userObj.user?.role} */}
                                </TableCell>
                            </TableRow>
                            {/* )
                                )} */}
                        </TableBody>
                    </Table>
                    {/* )} */}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default BookingList;
