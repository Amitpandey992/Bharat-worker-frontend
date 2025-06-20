// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@radix-ui/react-dropdown-menu";
// import { Edit, MoreHorizontal } from "lucide-react";
// import { usePartner } from "@/context/PartnerContext";
// import { Button } from "@/components/ui/button";
// import * as Dialog from "@radix-ui/react-dialog";

// const PartnerList = () => {
//   const {
//     partnerData,
//     fetchPartnerList,
//     isLoading,
//   } = usePartner();

//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     skillName: "",
//     yearsOfExperience: "",
//   });
//   const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
//   const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

//   useEffect(() => {
//     fetchPartnerList(1, 10);
//   }, []);

//   const handleUpdateSkill = async () => {
//     if (!selectedPartnerId || !selectedSkillId) return;

//     try {
//       const payload = {
//         skillName: formData.skillName,
//         yearsOfExperience: Number(formData.yearsOfExperience),
//       };

//       await fetch(`/partner/updateSkills/partnerId/${selectedPartnerId}/skillId/${selectedSkillId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       await fetchPartnerList(1, 10);
//       setEditDialogOpen(false);
//     } catch (error) {
//       console.error("Skill update error:", error);
//     }
//   };

//   const openEditDialog = (partnerId: string, skillId: string, skillName: string, yearsOfExperience: number) => {
//     setSelectedPartnerId(partnerId);
//     setSelectedSkillId(skillId);
//     setFormData({
//       skillName,
//       yearsOfExperience: yearsOfExperience.toString(),
//     });
//     setEditDialogOpen(true);
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Partner List</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : partnerData.data.length === 0 ? (
//           <p>No partners found.</p>
//         ) : (
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Partner Name</TableHead>
//                 <TableHead>Partner Email</TableHead>
//                 <TableHead>Partner Phone</TableHead>
//                 <TableHead>Role</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {partnerData.data.map((partner) => (
//                 <TableRow key={partner._id}>
//                   <TableCell>
//                     <div className="flex items-center space-x-2">
//                       <Avatar>
//                         <AvatarFallback>
//                           {partner.user.name.slice(0, 2).toUpperCase()}
//                         </AvatarFallback>
//                       </Avatar>
//                       <span>{partner.user.name}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell>{partner.user.email}</TableCell>
//                   <TableCell>{partner.user.phone}</TableCell>
//                   <TableCell>{partner.user.role}</TableCell>
//                   <TableCell>{partner.user.isActive}</TableCell>
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoreHorizontal />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         {partner.skills.map((skill) => (
//                           <DropdownMenuItem
//                             key={skill._id}
//                             onClick={() => openEditDialog(partner._id, skill._id, skill.skillName, skill.yearsOfExperience)}
//                           >
//                             <Edit className="w-4 h-4 mr-2" /> Edit {skill.skillName}
//                           </DropdownMenuItem>
//                         ))}
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         )}
//       </CardContent>

//       {/* Dialog for Editing Skills */}
//       <Dialog.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
//         <Dialog.Portal>
//           <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
//           <Dialog.Content className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto z-50 mt-24">
//             <Dialog.Title className="text-lg font-semibold mb-4">Edit Skill</Dialog.Title>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm">Skill Name</label>
//                 <input
//                   type="text"
//                   value={formData.skillName}
//                   onChange={(e) => setFormData((prev) => ({ ...prev, skillName: e.target.value }))}
//                   className="w-full border px-3 py-2 rounded mt-1"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm">Years of Experience</label>
//                 <input
//                   type="number"
//                   value={formData.yearsOfExperience}
//                   onChange={(e) => setFormData((prev) => ({ ...prev, yearsOfExperience: e.target.value }))}
//                   className="w-full border px-3 py-2 rounded mt-1"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end gap-2 mt-6">
//               <Button onClick={handleUpdateSkill}>Update</Button>
//               <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
//                 Cancel
//               </Button>
//             </div>
//           </Dialog.Content>
//         </Dialog.Portal>
//       </Dialog.Root>
//     </Card>
//   );
// };

// export default PartnerList;


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
import { UserPlus, Edit, MoreHorizontal, Settings2, X, Info } from "lucide-react";
import { CustomerList } from "@/shared/types";
import { useCustomer } from "@/context/CustomerContext";
import { useToast } from "@/components/ui/use-toast";
import { PaginatedResponse } from "@/shared/interfaces";
import { useNavigate } from "react-router-dom";
type CustomerItem = CustomerList["customers"][number];

const PartnerList = () => {
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
    } = useCustomer();

    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editData, setEditData] = useState<CustomerItem | null>(null);
    const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
    const [selectedUserToDeactivate, setSelectedUserToDeactivate] =
        useState<CustomerItem | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "customer",
    });
    const { toast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        if (name === "phone" && !/^\d{0,10}$/.test(value)) return;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            role: "customer",
        });
        setEditData(null);
    };

    const saveNewCustomer = async () => {
        if (editData) {
            await updateCustomer(editData.user._id, formData);
        } else {
            if (
                !formData.name ||
                !formData.email ||
                !formData.phone ||
                !formData.password
            ) {
                toast({
                    title: "Please fill all the fields",
                    variant: "destructive",
                    duration: 3000,
                });
                return;
            }

            if (formData.phone.length !== 10 || isNaN(Number(formData.phone))) {
                toast({
                    title: "Please enter a valid 10-digit phone number",
                    variant: "destructive",
                    duration: 3000,
                });
                return;
            }

            if (!formData.email.includes("@")) {
                toast({
                    title: "Please enter a valid email address",
                    variant: "destructive",
                    duration: 3000,
                });
                return;
            }

            await addCustomer(formData);
        }

        setDialogOpen(false);
        resetForm();
    };

    const editCustomer = (userData: CustomerItem) => {
        setEditData(userData);
        setFormData({
            name: userData.user.name,
            email: userData.user.email,
            password: "",
            phone: userData.user.phone.toString(),
            role: userData.user.role,
        });
        setDialogOpen(true);
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

    useEffect(() => {
        fetchCustomerList(paginationData.currentPage, paginationData.pageSize);
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
                    <CardTitle>Partner List</CardTitle>
                    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
                                <Dialog.Title className="text-lg font-semibold mb-4">
                                    {editData
                                        ? "Edit Customer"
                                        : "Add Customer"}
                                </Dialog.Title>
                                <div className="space-y-4">
                                    {["name", "email", "password", "phone"].map(
                                        (field) => (
                                            <div key={field}>
                                                <label className="block text-sm font-medium capitalize">
                                                    {field}
                                                </label>
                                                <input
                                                    className="w-full border rounded p-2"
                                                    name={field}
                                                    type={
                                                        field === "password"
                                                            ? "password"
                                                            : "text"
                                                    }
                                                    value={
                                                        (formData as any)[field]
                                                    }
                                                    onChange={handleInputChange}
                                                    placeholder={`Enter ${field}`}
                                                />
                                            </div>
                                        )
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Role
                                        </label>
                                        <input
                                            className="w-full border rounded p-2"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            disabled
                                        />
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
                    {customerData.customers.length === 0 ? (
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
                                totalItems: customerData.pagination.totalItems,
                                totalPages: customerData.pagination.totalPages,
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
                                {customerData.customers.map(
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
                                                        userObj.user.isActive
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {userObj.user.isActive
                                                        ? "Active"
                                                        : "Inactive"}
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
                                                                    `/bookinghistory/${userObj._id}`
                                                                )
                                                            }
                                                        >
                                                            <Info  className="mr-2 h-4 w-4" />
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
};

export default PartnerList;
