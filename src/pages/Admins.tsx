import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  UserPlus,
  Edit,
  MoreHorizontal,
  ArrowUpDown,
  Settings2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { IPaginationData } from "@/shared/interfaces";

const Admins = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paginationData, setPaginationData] = useState<IPaginationData>({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
          <p className="text-lg text-muted-foreground">
            Loading administrators...
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
          <CardTitle>Admin Management</CardTitle>
          <div className="flex items-center space-x-2">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Admin
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table
            pagination={{
              pageSize: paginationData.pageSize,
              currentPage: paginationData.currentPage,
              onPageChange: (page) => {
                setPaginationData((prev) => ({
                  ...prev,
                  currentPage: page,
                }));
              },
              totalItems: paginationData.totalItems,
              totalPages: paginationData.totalPages,
            }}
          >
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 text-muted-foreground hover:text-primary"
                  >
                    <span>Administrator</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 text-muted-foreground hover:text-primary"
                  >
                    <span>Email</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 text-muted-foreground hover:text-primary"
                  >
                    <span>Mobile Number</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 text-muted-foreground hover:text-primary"
                  >
                    <span>Status</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 text-muted-foreground hover:text-primary"
                  >
                    <span>Created</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No administrators found
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback
                        className={"bg-gold text-gold-foreground"}
                      >
                        xc
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">xc</span>
                  </div>
                </TableCell>
                <TableCell>gh</TableCell>
                <TableCell>df</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full">jk</span>
                </TableCell>
                <TableCell>gfd</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="!z-[999]">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-[160px] rounded-md border bg-white p-2 shadow-md !z-[999]"
                    >
                      <DropdownMenuItem className="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm ">
                        <Settings2 className="mr-2 h-4 w-4" />
                        sdfsd
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Admins;
