import { useState} from "react";
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
import { Button } from "@/components/ui/button";
import { Select } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";

const PendingWithdrawal = () => {
    const { isLoading } = useAdmin();


    const [paginationData, setPaginationData] = useState<PaginatedResponse>({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
    });

2


    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="text-lg text-muted-foreground">Loading services...</p>
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
           <Card className="p-6">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold">Pending Withdrawal Requests</h2>
    <div className="flex gap-2">
      <Input placeholder="Search by name or email" />
      <Select> {/* Filter status */} </Select>
    </div>
  </div>

  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Method</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
    
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>₹</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            {/* <Badge variant="secondary">{item.status}</Badge> */}
          </TableCell>
          <TableCell>
            <div className="flex gap-2">
              <Button size="sm">Approve</Button>
              <Button size="sm" variant="destructive">Reject</Button>
            </div>
          </TableCell>
        </TableRow>
    
    </TableBody>
  </Table>
</Card>

        </motion.div>
    );
};

export default PendingWithdrawal;