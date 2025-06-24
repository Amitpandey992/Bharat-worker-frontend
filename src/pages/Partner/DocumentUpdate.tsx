import React, { useState } from "react";
import { Upload, X, Image, Loader } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { PartnerService } from "@/services/partner.service";
import { useToast } from "@/components/ui/use-toast";

function DocumentUpload() {
    const [bookingLoading, setBookingLoading] = useState(false);
    const { toast } = useToast();
    const [files, setFiles] = useState<{
        aadharFront: File | null;
        aadharBack: File | null;
        panFront: File | null;
        panBack: File | null;
        experienceCertificates: File[];
    }>({
        aadharFront: null,
        aadharBack: null,
        panFront: null,
        panBack: null,
        experienceCertificates: [],
    });

    const [previews, setPreviews] = useState<{
        [key: string]: string | null;
    }>({});

    const handleSingleFile = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: string
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFiles((prev) => ({ ...prev, [key]: file }));

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviews((prev) => ({
                ...prev,
                [key]: reader.result as string,
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []);
        setFiles((prev) => ({
            ...prev,
            experienceCertificates: [
                ...prev.experienceCertificates,
                ...newFiles,
            ],
        }));
        newFiles.forEach((file, idx) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews((prev) => ({
                    ...prev,
                    [`experience_${Date.now()}_${idx}`]:
                        reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const removeFile = (key: string) => {
        setFiles((prev) => ({ ...prev, [key]: null }));
        setPreviews((prev) => {
            const copy = { ...prev };
            delete copy[key];
            return copy;
        });
    };

    const removeExperienceFile = (index: number) => {
        setFiles((prev) => {
            const updated = [...prev.experienceCertificates];
            updated.splice(index, 1);
            return { ...prev, experienceCertificates: updated };
        });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        if (
            !files.aadharFront ||
            !files.aadharBack ||
            !files.panFront ||
            !files.panBack
        ) {
            toast({
                title: "Error Occurred",
                description: "All Fields Are Required",
                variant: "destructive",
            });
            return;
        }
        if (files.aadharFront)
            formData.append("aadharFront", files.aadharFront);
        if (files.aadharBack) formData.append("aadharBack", files.aadharBack);
        if (files.panFront) formData.append("panFront", files.panFront);
        if (files.panBack) formData.append("panBack", files.panBack);
        files.experienceCertificates.forEach((file) => {
            formData.append("experienceCertificates", file);
        });

        try {
            setBookingLoading(true);
            await PartnerService.uploadPartnerDocument(formData);
            toast({
                title: "Documents uploaded successfully!",
                variant: "default",
            });
            setFiles({
                aadharFront: null,
                aadharBack: null,
                panFront: null,
                panBack: null,
                experienceCertificates: [],
            });
        } catch (err: any) {
            console.error(err);
            toast({
                title: "Upload failed.",
                variant: "destructive",
            });
        } finally {
            setBookingLoading(false);
        }
    };

    const renderUploadBlock = (label: string, key: keyof typeof files) => (
        <div className="space-y-3" key={key}>
            <Label
                htmlFor={key}
                className="text-sm font-medium text-gray-700 block"
            >
                {label}
            </Label>
            {!previews[key] ? (
                <div className="relative">
                    <Input
                        id={key}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSingleFile(e, key)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 bg-gray-50">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium text-blue-600 hover:text-blue-500">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, up to 10MB
                        </p>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                        <div className="flex justify-center">
                            <img
                                src={previews[key]!}
                                alt="Preview"
                                className="max-w-full max-h-80 object-contain rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                    <Button
                        type="button"
                        onClick={() => removeFile(key)}
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 shadow-md"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                    <div className="mt-3 flex items-center text-sm text-gray-600 bg-gray-50 rounded-md p-3">
                        <Image className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="truncate font-medium">
                            {Array.isArray(files[key]) ? "" : files[key]?.name}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <Card className="shadow-lg">
                <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        Upload Documents
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        <div className="space-y-6">
                            {renderUploadBlock(
                                "Aadhar Card - Front",
                                "aadharFront"
                            )}
                            {renderUploadBlock(
                                "Aadhar Card - Back",
                                "aadharBack"
                            )}
                            {renderUploadBlock("PAN Card - Front", "panFront")}
                            {renderUploadBlock("PAN Card - Back", "panBack")}
                        </div>

                        {/* Experience Documents */}
                        <div className="space-y-6">
                            <div className="border-b border-gray-200 pb-2">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Experience Certificates
                                </h3>
                            </div>
                            <div className="space-y-6">
                                {files.experienceCertificates.map(
                                    (file, index) => (
                                        <div key={index} className="relative">
                                            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                                                <div className="flex justify-center">
                                                    <img
                                                        src={
                                                            previews[
                                                                Object.keys(
                                                                    previews
                                                                )[index]
                                                            ]!
                                                        }
                                                        alt="Preview"
                                                        className="max-w-full max-h-80 object-contain rounded-md shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    removeExperienceFile(index)
                                                }
                                                variant="destructive"
                                                size="sm"
                                                className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 shadow-md"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                            <div className="mt-3 flex items-center text-sm text-gray-600 bg-gray-50 rounded-md p-3">
                                                <Image className="h-4 w-4 mr-2 text-gray-500" />
                                                <span className="truncate font-medium">
                                                    {file.name}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                )}

                                <div className="relative">
                                    <Input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        multiple
                                        onChange={handleMultipleFiles}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 bg-gray-50">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                        <p className="text-sm text-gray-600 mb-1">
                                            <span className="font-medium text-blue-600 hover:text-blue-500">
                                                Click to upload
                                            </span>{" "}
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, PDF up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-gray-200">
                            <Button
                                onClick={handleSubmit}
                                className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm"
                            >
                                {bookingLoading ? (
                                    <Loader className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default DocumentUpload;
