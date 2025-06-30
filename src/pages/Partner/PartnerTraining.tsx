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
import { Badge } from "lucide-react";

const PartnerTraining  = () => {
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
    <CardTitle>Partner Training</CardTitle>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2">
     
        <li className="flex justify-between items-center">
          <span>title</span>
          <Badge >
            
          </Badge>
        </li>
   
    </ul>
    <Button className="mt-4" >
      Take Quiz
    </Button>
  </CardContent>
</Card>

        </motion.div>
    );
};

export default PartnerTraining ;