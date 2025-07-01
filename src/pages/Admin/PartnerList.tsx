import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    MoreHorizontal,
    X,
    Settings2,
    Info,
    Edit,
    UserPlus,
    Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaginatedResponse } from "@/shared/interfaces";
import { useAdmin } from "@/context/AdminContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PartnerListType } from "@/shared/types";
import { useToast } from "@/components/ui/use-toast";
import {
    Select,
    SelectItem,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
type PartnerItem = PartnerListType["partners"][number];

const PartnerList: React.FC = () => {
    const {
        partnerData,
        fetchPartnerList,
        addUser,
        updateUser,
        deactivatePartner,
        isLoading,
    } = useAdmin();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "partner",
        isActive: true,
    });
    const [paginationData, setPaginationData] = useState<PaginatedResponse>({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editData, setEditData] = useState<PartnerItem | null>(null);
    const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
    const [selectedUserToDeactivate, setSelectedUserToDeactivate] =
        useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name === "phone" && !/^\d{0,10}$/.test(value)) return;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            role: "partner",
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
                const response = await updateUser(editData.user._id, formData);
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
                    description: "Partner's details updated successfully.",
                    variant: "default",
                });
            } else {
                if (!password) {
                    toast({
                        title: "Error",
                        description: "Please fill all the fields.",
                        variant: "destructive",
                    });
                    return;
                }
                const response = await addUser(formData);
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
                    description: "Partner added successfully.",
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

    const editPartner = (userData: PartnerItem) => {
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
                    <p className="text-lg text-muted-foreground">
                        Loading partners...
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
            <Dialog.Root
                open={deactivateDialogOpen}
                onOpenChange={setDeactivateDialogOpen}
            >
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
                        <Dialog.Title className="text-lg font-semibold mb-4">
                            Deactivate Partner
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
                    <CardTitle>Partner List</CardTitle>
                    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                        <Dialog.Trigger asChild>
                            <Button>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add Partner
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
                                <div className="space-y-4">
                                    <div className="mt-4 space-y-2">
                                        <div className="mt-4 space-y-2">
                                            <Label className="block text-sm font-medium capitalize">
                                                Name
                                            </Label>
                                            <Input
                                                name="name"
                                                className="w-full border rounded p-2"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter Name..."
                                            />
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            <Label className="block text-sm font-medium capitalize">
                                                Email
                                            </Label>
                                            <Input
                                                name="email"
                                                className="w-full border rounded p-2"
                                                type="text"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Enter Email..."
                                            />
                                        </div>
                                        {!editData && (
                                            <div className="mt-4 space-y-2">
                                                <Label className="block text-sm font-medium capitalize">
                                                    Password
                                                </Label>
                                                <Input
                                                    name="password"
                                                    className="w-full border rounded p-2"
                                                    type="text"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter password..."
                                                />
                                            </div>
                                        )}

                                        <div className="mt-4 space-y-2">
                                            <Label className="block text-sm font-medium capitalize">
                                                Mobile Number
                                            </Label>
                                            <Input
                                                name="phone"
                                                className="w-full border rounded p-2"
                                                type="text"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Enter Mobile number..."
                                            />
                                        </div>

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
                                                        In-Active
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-2">
                                    <Button
                                        className="bg-blue-600 text-white"
                                        onClick={saveNewCustomer}
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <>
                                                {" "}
                                                {editData
                                                    ? "Update"
                                                    : "Add"}{" "}
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
                                    <Button
                                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                        aria-label="Close"
                                        onClick={resetForm}
                                        variant="ghost"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </CardHeader>

                <CardContent>
                    {partnerData?.partners.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground text-lg">
                            No partners found.
                        </div>
                    ) : (
                        <Table
                            pagination={{
                                pageSize: paginationData.pageSize,
                                currentPage: paginationData.currentPage,
                                onPageChange: (page) =>
                                    setPaginationData((prev) => ({
                                        ...prev,
                                        currentPage: page,
                                    })),
                                totalItems:
                                    partnerData?.pagination.totalItems || 0,
                                totalPages:
                                    partnerData?.pagination.totalPages || 0,
                            }}
                        >
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Partner Name</TableHead>
                                    <TableHead> Partner Email</TableHead>
                                    <TableHead>Partner Mobile No.</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {partnerData?.partners?.map((partner: any) => (
                                    <TableRow key={partner._id}>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <Avatar>
                                                    <AvatarFallback className="bg-blue-500 text-white">
                                                        {partner.user?.name
                                                            .slice(0, 2)
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">
                                                    {partner.user?.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {partner.user?.email}
                                        </TableCell>
                                        <TableCell>
                                            {partner.user?.phone}
                                        </TableCell>
                                        <TableCell>
                                            {partner.user?.role}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    partner.user?.isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {partner.user?.isActive
                                                    ? "Active"
                                                    : "In Active"}
                                            </span>
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
                                                        onClick={() =>
                                                            editPartner(partner)
                                                        }
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        className="flex cursor-pointer items rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap"
                                                        onClick={() =>
                                                            openDeactivateDialog(
                                                                partner
                                                            )
                                                        }
                                                    >
                                                        <Settings2 className="mr-2 h-4 w-4" />{" "}
                                                        Deactivate
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="flex cursor-pointer items rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted text-nowrap"
                                                        onClick={() =>
                                                            navigate(
                                                                `/partnerlist/${partner._id}`
                                                            )
                                                        }
                                                    >
                                                        <Info className="mr-2 h-4 w-4" />{" "}
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

export default PartnerList;
