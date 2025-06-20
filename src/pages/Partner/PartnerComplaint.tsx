import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Edit, Settings2, MoreVertical, MoreHorizontal } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
// import { IPaginationData } from "@/shared/interfaces";

const PartnerComplaint = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [paginationData, setPaginationData] = useState<IPaginationData>({
  //   currentPage: 1,
  //   pageSize: 10,
  //   totalItems: 0,
  //   totalPages: 0,
  // });

  const navigate = useNavigate();

  const userObj = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    skill: "Plumbing",
    date: "2025-06-19",
  };

  const handleEdit = (user: typeof userObj) => {
    console.log("Edit", user);
  };

  const openDeactivateDialog = (user: typeof userObj) => {
    console.log("Deactivate", user);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg text-muted-foreground">Loading booking history...</p>
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
          <CardTitle>All Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner Name</TableHead>
                  <TableHead>Partner Email</TableHead>
                  <TableHead>Partner Mobile No.</TableHead>
                  <TableHead>Category/Skill</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{userObj.name}</TableCell>
                  <TableCell>{userObj.email}</TableCell>
                  <TableCell>{userObj.phone}</TableCell>
                  <TableCell>{userObj.skill}</TableCell>
                  <TableCell>{userObj.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="z-[999] w-40">

                        <DropdownMenuItem onClick={() => openDeactivateDialog(userObj)}>
                          <Settings2 className="mr-2 h-4 w-4" />
                          Ban/Suspend
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PartnerComplaint;
