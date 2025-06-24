import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  UserPlus,
  Edit,
  MoreHorizontal,
  Settings2,
  X,
  Info,
} from "lucide-react";
import { CustomerList } from "@/shared/types";
import { useToast } from "@/components/ui/use-toast";
import { PaginatedResponse } from "@/shared/interfaces";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
type CustomerItem = CustomerList["customers"][number];

const CustomerListdata = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [paginationData, setPaginationData] = useState<PaginatedResponse>({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
    });
    const {
        customerData,
        fetchCustomerList,
        isLoading,
        addCustomer,
        updateCustomer,
        deactivateCustomer,
    } = useAdmin();

    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editData, setEditData] = useState<CustomerItem | null>(null);
    const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
    const [selectedUserToDeactivate, setSelectedUserToDeactivate] =
        useState<CustomerItem | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "000000",
        phone: "",
        role: "customer",
        isActive: true,
    });
    const { toast } = useToast();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        const isCheckbox = type === "checkbox";

        if (name === "phone" && !/^\d{0,10}$/.test(value)) return;

        setFormData((prev) => ({
            ...prev,
            [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            role: "customer",
            isActive: true,
        });
        setEditData(null);
    };

    const saveNewCustomer = async () => {
        setIsSubmitting(true);

        try {
            const { name, email, phone, password } = formData;
            if (!name || !email || !phone) {
                toast({
                    title: "Error",
                    description: "Please fill all the fields.",
                    variant: "destructive",
                });
                return;
            }

            if (phone.length !== 10 || isNaN(Number(phone))) {
                toast({
                    title: "Invalid Phone Number",
                    description: "Please enter a valid 10-digit number.",
                    variant: "destructive",
                });
                return;
            }

            if (!email.includes("@")) {
                toast({
                    title: "Invalid Email",
                    description: "Please enter a valid email address.",
                    variant: "destructive",
                });
                return;
            }
            if (editData) {
                const response = await updateCustomer(
                    editData.user._id,
                    formData
                );
                if (!response.success) {
                    toast({
                        title: "Error",
                        description:
                            response.message || "Something went wrong.",
                        variant: "destructive",
                    });
                    return;
                }
                toast({
                    title: "Success",
                    description: "Customer details updated successfully.",
                    variant: "default",
                });
            } else {
                const response = await addCustomer(formData);
                if (!response.success) {
                    toast({
                        title: "Error",
                        description:
                            response.message || "Something went wrong.",
                        variant: "destructive",
                    });
                    return;
                }
                toast({
                    title: "Success",
                    description: "Customer added successfully.",
                    variant: "default",
                });
            }

            setDialogOpen(false);
            resetForm();
        } catch (error) {
            console.error("Error saving customer:", error);
            toast({
                title: "Error",
                description: "Something went wrong while saving.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

  const openDeactivateDialog = (user: CustomerItem) => {
    setSelectedUserToDeactivate(user);
    setDeactivateDialogOpen(true);
  };

  const confirmDeactivate = async () => {
    if (selectedUserToDeactivate) {
      await deactivateCustomer(selectedUserToDeactivate.user._id);
      setDeactivateDialogOpen(false);
      setSelectedUserToDeactivate(null);
    }
  };
   const editCustomer = (userData: CustomerItem) => {
        setEditData(userData);
        setFormData({
            name: userData.user.name,
            email: userData.user.email,
            password: "",
            phone: userData.user.phone.toString(),
            role: userData.user.role,
            isActive: userData.user.isActive,
        });
        setDialogOpen(true);
    };

  useEffect(() => {
    fetchCustomerList(paginationData.currentPage, paginationData.pageSize);
  }, [paginationData]);

  if (isLoading) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <Dialog.Root
                open={deactivateDialogOpen}
                onOpenChange={setDeactivateDialogOpen}
            >
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
                        <Dialog.Title className="text-lg font-semibold mb-4">
                            Deactivate Customer
                        </Dialog.Title>
                        <p>
                            Are you sure you want to deactivate{" "}
                            <strong>
                                {selectedUserToDeactivate?.user.name}
                            </strong>
                            ?
                        </p>
                        <div className="mt-6 flex justify-end gap-2">
                            <Button
                                variant="destructive"
                                onClick={confirmDeactivate}
                            >
                                Deactivate
                            </Button>
                            <Dialog.Close asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Customer List</CardTitle>
                    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                        <Dialog.Trigger asChild>
                            <Button>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add Customer
                            </Button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
                                <Dialog.Title className="text-lg font-semibold mb-4">
                                    {editData
                                        ? "Edit Customer"
                                        : "Add Customer"}
                                </Dialog.Title>
                                <div className="mt-4 space-y-2">
                                    {["name", "email", "phone"].map((field) => (
                                        <div
                                            key={field}
                                            className="mt-4 space-y-2"
                                        >
                                            <Label className="block text-sm font-medium capitalize">
                                                {field}
                                            </Label>
                                            <Input
                                                className="w-full border rounded p-2"
                                                name={field}
                                                type="text"
                                                value={(formData as any)[field]}
                                                onChange={handleInputChange}
                                                placeholder={`Enter ${field}`}
                                            />
                                        </div>
                                    ))}
                                    <div className="mt-4 space-y-2">
                                        <Label className="block text-sm font-medium">
                                            Role
                                        </Label>
                                        <Input
                                            className="w-full border rounded p-2"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            disabled
                                        />
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <Label className="block text-sm font-medium">
                                            Customer Status
                                        </Label>
                                        <Select
                                            name="isActive"
                                            value={
                                                formData.isActive
                                                    ? "active"
                                                    : "inactive"
                                            }
                                            onValueChange={(value) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    isActive:
                                                        value === "active",
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="inactive">
                                                    InActive
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-2">
                                    <Button
                                        className="bg-blue-600 text-white"
                                        onClick={saveNewCustomer}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                Saving...
                                            </div>
                                        ) : (
                                            <>
                                                {editData ? "Update" : "Add"}{" "}
                                                Customer
                                            </>
                                        )}
                                    </Button>
                                    <Dialog.Close asChild>
                                        <Button
                                            variant="outline"
                                            onClick={resetForm}
                                        >
                                            Cancel
                                        </Button>
                                    </Dialog.Close>
                                </div>
                                <Dialog.Close asChild>
                                    <button
                                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                        aria-label="Close"
                                        onClick={resetForm}
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </CardHeader>

                <CardContent>
                    {customerData?.customers.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground text-lg">
                            No customers found.
                        </div>
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
                                totalItems: customerData?.pagination.totalItems ?? 0,
                                totalPages: customerData?.pagination.totalPages ?? 0,
                            }}
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
                                {customerData?.customers.map(
                                    (userObj, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Avatar>
                                                        <AvatarFallback className="bg-blue-500 text-white">
                                                            {userObj.user?.name
                                                                ?.slice(0, 2)
                                                                .toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">
                                                        {userObj.user?.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {userObj.user?.email}
                                            </TableCell>
                                            <TableCell>
                                                {userObj.user?.phone}
                                            </TableCell>

                                            <TableCell>
                                                {userObj.user?.role}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        userObj.user?.isActive
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {userObj.user?.isActive
                                                        ? "Active"
                                                        : "InActive"}
                                                </span>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="w-[180px] rounded-md border bg-white p-2 shadow-md !z-[999]"
                                                    >
                                                        <DropdownMenuItem
                                                            className="flex cursor-pointer items rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap"
                                                            onClick={() =>
                                                                editCustomer(
                                                                    userObj
                                                                )
                                                            }
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap"
                                                            onClick={() =>
                                                                openDeactivateDialog(
                                                                    userObj
                                                                )
                                                            }
                                                        >
                                                            <Settings2 className="mr-2 h-4 w-4" />
                                                            Deactivate
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap "
                                                            onClick={() =>
                                                                navigate(
                                                                    `/customerDetails/${userObj._id}`
                                                                )
                                                            }
                                                        >
                                                            <Info className="mr-2 h-4 w-4" />
                                                            View More Details
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Dialog.Root
        open={deactivateDialogOpen}
        onOpenChange={setDeactivateDialogOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Deactivate Customer
            </Dialog.Title>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Customer List</CardTitle>
          <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
              <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
                <Dialog.Title className="text-lg font-semibold mb-4">
                  {editData ? "Edit Customer" : "Add Customer"}
                </Dialog.Title>
                <div className="space-y-4">
                  {["name", "email", "phone"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium capitalize">
                        {field}
                      </label>
                      <input
                        className="w-full border rounded p-2"
                        name={field}
                        type="text"
                        value={(formData as any)[field]}
                        onChange={handleInputChange}
                        placeholder={`Enter ${field}`}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium">Role</label>
                    <input
                      className="w-full border rounded p-2"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium">
                      Customer Status
                    </label>
                    <select
                      name="isActive"
                      value={formData.isActive ? "active" : "inactive"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          isActive: e.target.value === "active",
                        }))
                      }
                      className="w-full border rounded p-2"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">InActive</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={saveNewCustomer}
                  >
                    {editData ? "Update" : "Add"} Customer
                  </Button>
                  <Dialog.Close asChild>
                    <Button variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                    onClick={resetForm}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </CardHeader>

        <CardContent>
          {customerData?.customers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-lg">
              No customers found.
            </div>
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
                totalItems: customerData?.pagination?.totalItems || 0,
                totalPages: customerData?.pagination?.totalPages || 0,
              }}
            >
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Customer Email</TableHead>
                  <TableHead>Customer Mobile No.</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerData?.customers.map((userObj, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-500 text-white">
                            {userObj.user?.name?.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {userObj.user?.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{userObj.user?.email}</TableCell>
                    <TableCell>{userObj.user?.phone}</TableCell>

                    <TableCell>{userObj.user?.role}</TableCell>
                    <TableCell>
                      {userObj.user ? (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            userObj.user.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {userObj.user.isActive ? "Active" : "InActive"}
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          No User
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-[180px] rounded-md border bg-white p-2 shadow-md !z-[999]"
                        >
                          <DropdownMenuItem
                            className="flex cursor-pointer items rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap"
                            onClick={() => editCustomer(userObj)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap"
                            onClick={() => openDeactivateDialog(userObj)}
                          >
                            <Settings2 className="mr-2 h-4 w-4" />
                            Deactivate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap "
                            onClick={() =>
                              navigate(`/customerDetails/${userObj._id}`)
                            }
                          >
                            <Info className="mr-2 h-4 w-4" />
                            View More Details
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

export default CustomerListdata;
