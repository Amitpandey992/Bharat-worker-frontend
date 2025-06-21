import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Edit, MoreHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaginatedResponse } from '@/shared/interfaces';
import { useAdmin } from '@/context/AdminContext';

const PartnerList: React.FC = () => {
  const { partnerData, fetchPartnerList, updatePartner, isLoading } = useAdmin();
  const [paginationData, setPaginationData] = useState<PaginatedResponse>({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [skillData, setskillData] = useState
  ({ skillName: '',
    yearsOfExperience: ''
   });
  

  const openEditDialog = useCallback(
    (partnerId: string, skillId: string, skillName: string, years: number) => {
      setSelectedPartnerId(partnerId);
      setSelectedSkillId(skillId);
      setskillData({ skillName, yearsOfExperience: years.toString() });
      setEditDialogOpen(true);
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!selectedPartnerId || !selectedSkillId) return;
    const yrs = Number(skillData.yearsOfExperience);
    if (isNaN(yrs) || yrs < 0) return;

    await updatePartner(selectedPartnerId, {
      skillId: selectedSkillId,
      skillName: skillData.skillName,
      yearsOfExperience: yrs,
    });
    setEditDialogOpen(false);
    fetchPartnerList(paginationData.currentPage, paginationData.pageSize);
  }, [selectedPartnerId, selectedSkillId, skillData, updatePartner, fetchPartnerList, paginationData]);

   useEffect(() => {
    fetchPartnerList(paginationData.currentPage, paginationData.pageSize);
  }, [paginationData]);

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
    className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Partner List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading partners…</div>
          ) : partnerData.partners.length === 0 ? (
            <div className="text-center py-8">No partners found.</div>
          ) : (
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
                totalItems: partnerData.pagination.totalItems,
                totalPages: partnerData.pagination.totalPages,
              }}
            >
              <TableHeader>
                <TableRow>
                  <TableHead>Partner Name</TableHead>
                  <TableHead>Partner Email</TableHead>
                  <TableHead>Phone</TableHead>
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
                          <AvatarFallback>
                            {partner.user.name.slice(0, 2).toUpperCase() || 'NA'}
                          </AvatarFallback>
                        </Avatar>
                        <span>{partner.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{partner.user.email}</TableCell>
                    <TableCell>{partner.user.phone}</TableCell>
                    <TableCell>{partner.user.role}</TableCell>
                    <TableCell>{partner.user.isActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {partner.skills.map((skill) => (
                            <DropdownMenuItem
                              key={skill._id}
                              onClick={() =>
                                openEditDialog(partner._id, skill._id, skill.skillName, skill.yearsOfExperience)
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Skill: {skill.skillName}
                            </DropdownMenuItem>
                          ))}
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

      <Dialog.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg">
            <Dialog.Title>Edit Skill</Dialog.Title>
            <div className="mt-4 space-y-4">
              <div>
                <label>Skill Name</label>
                <input
                  className="w-full border rounded p-2 mt-1"
                  value={skillData.skillName}
                  onChange={(e) => setskillData((p) => ({ ...p, skillName: e.target.value }))}
                />
              </div>
              <div>
                <label>Years of Experience</label>
                <input
                  type="number"
                  className="w-full border rounded p-2 mt-1"
                  value={skillData.yearsOfExperience}
                  onChange={(e) => setskillData((p) => ({ ...p, yearsOfExperience: e.target.value }))}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button onClick={handleSave}>Update</Button>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
            </div>
            <button className="absolute top-4 right-4" onClick={() => setEditDialogOpen(false)}>
              <X />
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </motion.div>
  );
};

export default PartnerList;
