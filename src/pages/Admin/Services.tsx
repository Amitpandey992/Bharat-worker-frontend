import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Save, Clock } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { ServiceType } from "@/shared/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { useToast } from "@/components/ui/use-toast";

type ServiceItem = ServiceType["services"][number];

const Services = () => {
    const { toast } = useToast();
    const {
        fetchServices,
        serviceData,
        isLoading,
        categoryData,
        fechCategories,
        createService,
        updateService,
        deleteService,
    } = useAdmin();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<ServiceItem | null>(
        null
    );
    // const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        category: string;
        pricingTiers: { name: string; price: number }[];
        partnerCommissionRate: number;
        surgePricing: {
            enabled: boolean;
            surgeMultiplier: number;
            surgeHours: { start: string; end: string }[];
        };
    }>({
        name: "",
        description: "",
        category: "",
        pricingTiers: [
            { name: "Basic", price: 0 },
            { name: "Standard", price: 0 },
            { name: "Premium", price: 0 },
        ],
        partnerCommissionRate: 0,
        surgePricing: {
            enabled: false,
            surgeMultiplier: 0,
            surgeHours: [{ start: "", end: "" }],
        },
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState<ServiceItem | null>(
        null
    );

    useEffect(() => {
        fechCategories();
        fetchServices();
    }, []);

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            category: "",
            pricingTiers: [
                { name: "Basic", price: 0 },
                { name: "Standard", price: 0 },
                { name: "Premium", price: 0 },
            ],
            partnerCommissionRate: 0,
            surgePricing: {
                enabled: false,
                surgeMultiplier: 2,
                surgeHours: [{ start: "", end: "" }],
            },
        });
        setEditingService(null);
    };

    const openModal = (service: ServiceItem | null = null) => {
        if (service) {
            setEditingService(service);
            setFormData({
                name: service.name,
                description: service.description,
                category: service.category._id,
                pricingTiers: service.pricingTiers.map((tier) => ({
                    name: tier.name,
                    price: tier.price,
                })),
                partnerCommissionRate: service.partnerCommissionRate,
                surgePricing: {
                    ...service.surgePricing,
                    surgeHours: service.surgePricing.surgeHours ?? [],
                },
            });
        } else {
            resetForm();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.description || !formData.category) {
            toast({
                title: "Please fill in all required fields",
                variant: "destructive",
            });
            return;
        }

        const selectedCategory = categoryData?.find(
            (cat) => cat._id === formData.category
        );

        if (!selectedCategory) {
            toast({
                title: "Invalid category selection",
                variant: "destructive",
            });
            return;
        }

        if (editingService) {
            console.log("formData before update", formData);
            await updateService(editingService._id, formData);
            toast({
                variant: "default",
                title: "Updated!!!",
                description: "Service Updated Successfully🎉",
            });
        } else {
            const payload = {
                ...formData,
                category: selectedCategory._id,
            };
            await createService(payload);
            toast({
                variant: "default",
                title: "🎉",
                description: "Service Created Successfully",
            });
        }

        closeModal();
    };

    // const allServices: ServiceItem[] = serviceData?.services ?? [];

    // const filteredServices: ServiceItem[] = allServices.filter((service) => {
    //     if (!searchTerm.trim()) return true;
    //     return (
    //         service?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         service?.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    // });
    // console.log("searchTerm:", searchTerm);
    // console.log("filteredServices:", filteredServices);
    console.log("serviceData:", serviceData);

    const addSurgeHour = () => {
        setFormData({
            ...formData,
            surgePricing: {
                ...formData.surgePricing,
                surgeHours: [
                    ...formData.surgePricing.surgeHours,
                    { start: "", end: "" },
                ],
            },
        });
    };

    const updateSurgeHour = (
        index: number,
        field: "start" | "end",
        value: string
    ) => {
        const newSurgeHours = [...formData.surgePricing.surgeHours];
        newSurgeHours[index][field] = value;
        setFormData({
            ...formData,
            surgePricing: {
                ...formData.surgePricing,
                surgeHours: newSurgeHours,
            },
        });
    };

    const removeSurgeHour = (index: number) => {
        setFormData({
            ...formData,
            surgePricing: {
                ...formData.surgePricing,
                surgeHours: formData.surgePricing.surgeHours.filter(
                    (_, i) => i !== index
                ),
            },
        });
    };

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="text-lg text-muted-foreground">
                        Loading services...
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
                    <CardTitle>Services Management</CardTitle>

                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="default"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                onClick={() => openModal()}
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Add Service
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingService
                                        ? "Edit Service"
                                        : "Add New Service"}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label className="block text-sm font-medium text-gray-700 mb-2">
                                            Service Name
                                        </Label>
                                        <Input
                                            type="text"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label className="block text-sm font-medium mb-2">
                                            Category
                                        </Label>
                                        <Select
                                            required
                                            value={formData.category}
                                            onValueChange={(value) =>
                                                setFormData({
                                                    ...formData,
                                                    category: value,
                                                })
                                            }
                                        >
                                            <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categoryData?.length === 0 ? (
                                                    <p className="text-center text-gray-400">
                                                        No category found...
                                                    </p>
                                                ) : (
                                                    categoryData?.map(
                                                        (category) => (
                                                            <SelectItem
                                                                key={
                                                                    category._id
                                                                }
                                                                value={
                                                                    category._id
                                                                }
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        )
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </Label>
                                    <Textarea
                                        required
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-4">
                                        Pricing Tiers
                                    </Label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {formData.pricingTiers.map(
                                            (tier, index) => (
                                                <div
                                                    key={index}
                                                    className="p-4 border border-gray-200 rounded-lg"
                                                >
                                                    <Label className="block text-xs font-medium text-gray-600 mb-2">
                                                        {tier.name}
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        required
                                                        onWheel={(e) =>
                                                            (
                                                                e.target as HTMLInputElement
                                                            ).blur()
                                                        }
                                                        min="0"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        value={tier.price}
                                                        onChange={(e) => {
                                                            const newTiers = [
                                                                ...formData.pricingTiers,
                                                            ];
                                                            newTiers[
                                                                index
                                                            ].price =
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                ) || 0;
                                                            setFormData({
                                                                ...formData,
                                                                pricingTiers:
                                                                    newTiers,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                                        Partner Commission Rate (%)
                                    </Label>
                                    <Input
                                        type="number"
                                        required
                                        min="0"
                                        max="100"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={formData.partnerCommissionRate}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                partnerCommissionRate:
                                                    parseInt(e.target.value) ||
                                                    0,
                                            })
                                        }
                                    />
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center mb-4">
                                        <Input
                                            type="checkbox"
                                            id="surgeEnabled"
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            checked={
                                                formData.surgePricing.enabled
                                            }
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    surgePricing: {
                                                        ...formData.surgePricing,
                                                        enabled:
                                                            e.target.checked,
                                                    },
                                                })
                                            }
                                        />
                                        <Label
                                            htmlFor="surgeEnabled"
                                            className="ml-2 text-sm font-medium text-gray-700"
                                        >
                                            Enable Surge Pricing
                                        </Label>
                                    </div>

                                    {formData.surgePricing.enabled && (
                                        <div className="space-y-4">
                                            <div>
                                                <Label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Surge Multiplier
                                                </Label>
                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    min="1"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    value={
                                                        formData.surgePricing
                                                            .surgeMultiplier
                                                    }
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            surgePricing: {
                                                                ...formData.surgePricing,
                                                                surgeMultiplier:
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    ),
                                                            },
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <Label className="text-sm font-medium text-gray-700">
                                                        Surge Hours
                                                    </Label>
                                                    <Button
                                                        variant="blue"
                                                        type="button"
                                                        onClick={addSurgeHour}
                                                    >
                                                        + Add Hour Range
                                                    </Button>
                                                </div>
                                                <div className="space-y-2">
                                                    {formData.surgePricing.surgeHours.map(
                                                        (hour, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex gap-2"
                                                            >
                                                                <Input
                                                                    type="time"
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                    value={
                                                                        hour.start
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateSurgeHour(
                                                                            index,
                                                                            "start",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <span className="self-center">
                                                                    to
                                                                </span>
                                                                <Input
                                                                    type="time"
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                    value={
                                                                        hour.end
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateSurgeHour(
                                                                            index,
                                                                            "end",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <Button
                                                                    variant="ghost"
                                                                    type="button"
                                                                    onClick={() =>
                                                                        removeSurgeHour(
                                                                            index
                                                                        )
                                                                    }
                                                                    className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <DialogFooter className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                                    <DialogClose asChild>
                                        <Button
                                            type="button"
                                            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="button"
                                        onClick={() => handleSubmit()}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        {editingService
                                            ? "Update Service"
                                            : "Create Service"}
                                    </Button>
                                </DialogFooter>
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    {/* <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Search services..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div> */}
                    {!serviceData || serviceData.services.length === 0 ? (
                        <div className="flex h-[60vh] w-full items-center justify-center text-center">
                            <p className="text-lg text-muted-foreground">
                                No services found...
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {serviceData.services?.map((service) => (
                                <div
                                    key={service._id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 capitalize">
                                                {service?.name}
                                            </h3>
                                            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-2">
                                                {service.category?.name}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                onClick={() =>
                                                    openModal(service)
                                                }
                                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Dialog
                                                open={deleteDialogOpen}
                                                onOpenChange={
                                                    setDeleteDialogOpen
                                                }
                                            >
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => {
                                                            setServiceToDelete(
                                                                service
                                                            );
                                                            setDeleteDialogOpen(
                                                                true
                                                            );
                                                        }}
                                                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Delete Service
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    <p>
                                                        Are you sure you want to
                                                        delete{" "}
                                                        <b>
                                                            {
                                                                serviceToDelete?.name
                                                            }
                                                        </b>
                                                        ?
                                                    </p>
                                                    <DialogFooter>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() =>
                                                                setDeleteDialogOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={async () => {
                                                                if (
                                                                    serviceToDelete
                                                                ) {
                                                                    await deleteService(
                                                                        serviceToDelete._id
                                                                    );
                                                                    setDeleteDialogOpen(
                                                                        false
                                                                    );
                                                                    setServiceToDelete(
                                                                        null
                                                                    );
                                                                    toast({
                                                                        variant:
                                                                            "default",
                                                                        title: "Deleted!",
                                                                        description:
                                                                            "Service deleted successfully.",
                                                                    });
                                                                }
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {service.description}
                                    </p>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                                            Pricing Tiers
                                        </h4>
                                        <div className="grid grid-cols-3 gap-2">
                                            {service.pricingTiers?.map(
                                                (tier) => (
                                                    <div
                                                        key={tier._id}
                                                        className="text-center p-2 bg-gray-50 rounded-lg"
                                                    >
                                                        <div className="text-xs font-medium text-gray-600">
                                                            {tier.name}
                                                        </div>
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            ₹{tier.price}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">
                                            Commission Rate
                                        </span>
                                        <span className="font-medium text-gray-900">
                                            {service.partnerCommissionRate}%
                                        </span>
                                    </div>

                                    {service.surgePricing?.enabled && (
                                        <div className="mt-2 flex items-center text-xs text-orange-600">
                                            <Clock className="w-3 h-3 mr-1" />
                                            Surge pricing enabled
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    {/* {filteredServices?.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-lg mb-2">
                                No services found
                            </div>
                            <p className="text-gray-600">
                                Try adjusting your search or add a new service
                            </p>
                        </div>
                    )} */}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default Services;
