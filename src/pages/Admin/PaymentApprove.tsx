import { useState } from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAdmin } from "@/context/AdminContext";
import { PaginatedResponse } from "@/shared/interfaces";
import { Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@radix-ui/react-select";

const PaymentApprove = () => {
    const { isLoading } = useAdmin();

    const [paginationData, setPaginationData] = useState<PaginatedResponse>({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
    });

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
            <Card className="p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Payout Approvals</h2>
                    <Select> {/* Weekly / Monthly */} </Select>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Period</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* {data.map((item) => ( */}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>₹</TableCell>
                                <TableCell>
                                    {/* <Badge>
              jj
              </Badge> */}
                                </TableCell>
                                <TableCell>
                                    <Button
                                    // onClick={() => handleApprove(item.id)}
                                    // disabled={item.status === "approved"}
                                    >
                                        Approve
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </motion.div>
    );
};

export default PaymentApprove;
