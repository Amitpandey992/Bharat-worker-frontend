
import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import {  MoreHorizontal, X, Settings2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaginatedResponse } from '@/shared/interfaces';
import { useAdmin } from '@/context/AdminContext';

const PartnerList: React.FC = () => {
  const { partnerData, fetchPartnerList, updatePartner, deactivatePartner, isLoading } = useAdmin();
  const navigate = useNavigate();

  const [paginationData, setPaginationData] = useState<PaginatedResponse>({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  });


  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);


  const [selectedUserToDeactivate, setSelectedUserToDeactivate] = useState<any>(null);
 


  const openDeactivateDialog = (partner: any) => {
    setSelectedUserToDeactivate(partner);
    setDeactivateDialogOpen(true);
  };

  const confirmDeactivate = async () => {
    if (selectedUserToDeactivate) {
      await deactivatePartner(selectedUserToDeactivate.user._id);
      setDeactivateDialogOpen(false);
      setSelectedUserToDeactivate(null);
    }
  };

  useEffect(() => {
    fetchPartnerList(paginationData.currentPage, paginationData.pageSize);
  }, [paginationData]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg text-muted-foreground">Loading partners...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">

      {/* Deactivate Partner Dialog */}
      <Dialog.Root open={deactivateDialogOpen} onOpenChange={setDeactivateDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">Deactivate Partner</Dialog.Title>
            <p>
              Are you sure you want to deactivate{" "}
              <strong>{selectedUserToDeactivate?.user.name}</strong>?
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="destructive" onClick={confirmDeactivate}>
                Deactivate
              </Button>
              <Dialog.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Card >
        <CardHeader>
          <CardTitle>Partner List</CardTitle>
        </CardHeader>


        <CardContent>
          {partnerData.partners.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-lg">No partners found.</div>
          ) : (
            <Table
              pagination={{
                pageSize: paginationData.pageSize,
                currentPage: paginationData.currentPage,
                onPageChange: (page) =>
                  setPaginationData((prev) => ({ ...prev, currentPage: page })),
                totalItems: partnerData.pagination.totalItems,
                totalPages: partnerData.pagination.totalPages,
              }}
            >
              <TableHeader>
                <TableRow>
                  <TableHead>Partner Name</TableHead>
                  <TableHead> Partner Email</TableHead>
                  <TableHead>Partner Mobile No.</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partnerData.partners.map((partner) => (
                  <TableRow key={partner._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-500 text-white">
                            {partner.user.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{partner.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{partner.user.email}</TableCell>
                    <TableCell>{partner.user.phone}</TableCell>
                    <TableCell>{partner.user.role}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          partner.user.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {partner.user.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>


                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px] rounded-md border bg-white p-2 shadow-md !z-[999]">
                       
                          <DropdownMenuItem
                          className="flex cursor-pointer items rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap"
                          onClick={() => openDeactivateDialog(partner)}>
                            <Settings2 className="mr-2 h-4 w-4" /> Deactivate
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                          className="flex cursor-pointer items rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap"
                          onClick={() => navigate(`/partnerDetails/${partner._id}`)}>
                            <Info className="mr-2 h-4 w-4" /> View More Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PartnerList;