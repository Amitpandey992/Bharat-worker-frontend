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
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";
import { useState } from "react";

const Category = () => {
  const { isLoading } = useAdmin();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleUpdate = () => {
    console.log("Update clicked");
    setOpenEdit(false);
  };

  const handleDelete = () => {
    console.log("Delete confirmed");
    setOpenDelete(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-lg text-muted-foreground">Loading partners...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Service Category</CardTitle>

          {/* Add Service Dialog */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button size="sm">+ Add Service</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-xl">
                <Dialog.Title className="text-lg font-semibold mb-2">Add New Service</Dialog.Title>
                <div className="space-y-2">
                  <div className="space-y-1 mb-2">
                    <Label htmlFor="new-name">Name</Label>
                    <Input id="new-name" placeholder="Enter service name" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new-desc">Description</Label>
                    <Input id="new-desc" placeholder="Enter service description" />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Dialog.Close asChild>
                    <Button variant="ghost">Cancel</Button>
                  </Dialog.Close>
                  <Button onClick={() => console.log("Add Service clicked")}>Add</Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Service Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Example Row */}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px] rounded-md border bg-white p-2 shadow-md">
                      <DropdownMenuItem
                        className="flex items-center px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted cursor-pointer"
                        onClick={() => setOpenEdit(true)}
                      >
                        <Edit className="mr-2 h-4 w-4 text-blue-500" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted cursor-pointer"
                        onClick={() => setOpenDelete(true)}
                      >
                        <Trash className="mr-2 h-4 w-4 text-red-500" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog.Root open={openEdit} onOpenChange={setOpenEdit}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold mb-2">Edit Service</Dialog.Title>
            <div className="space-y-2">
              <div className="space-y-1 mb-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" placeholder="Service name" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-desc">Description</Label>
                <Input id="edit-desc" placeholder="Service description" />
              </div>

            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Dialog.Close asChild>
                <Button variant="ghost">Cancel</Button>
              </Dialog.Close>
              <Button onClick={handleUpdate}>Update</Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Delete Confirmation Dialog */}
      <Dialog.Root open={openDelete} onOpenChange={setOpenDelete}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold text-black-600">Confirm Deletion</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to delete this service? This action cannot be undone.
            </Dialog.Description>
            <div className="flex justify-end space-x-2 pt-6">
              <Dialog.Close asChild>
                <Button variant="ghost">Cancel</Button>
              </Dialog.Close>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </motion.div>
  );
};

export default Category;
