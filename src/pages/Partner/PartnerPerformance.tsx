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
import { Button } from "@/components/ui/button";
import { Select } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import { Badge } from "lucide-react";

const PartnerPerformance = () => {
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
            <Card>
                <CardHeader>
                    <CardTitle>Performance Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border p-4 shadow-sm bg-white">
                            <p className="text-sm text-gray-500">lable</p>
                            <p className="text-xl font-bold text-gray-800">value</p>
                        </div>
                        {/* <Card label="Jobs Completed" value={56} /> */}
                        {/* <Card label="Avg. Rating" value="4.8 ★" /> */}
                        {/* <Card label="Cancellation Rate" value="2%" /> */}
                        {/* <Card label="Response Time" value="15 mins" /> */}
                    </div>
                    <div className="mt-4">
                        <p className="text-lg font-semibold">Your Rank: <span className="text-green-600">Top 10%</span></p>
                    </div>
                </CardContent>
            </Card>


        </motion.div>
    );
};

export default PartnerPerformance;