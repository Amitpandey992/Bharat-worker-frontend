import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ArrowLeftIcon } from "lucide-react";
import { PartnerList } from "@/shared/types";
import { useAdmin } from "@/context/AdminContext";

type Partner = PartnerList["partners"][number];

const PartnerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getPartner, isLoading } = useAdmin();
    const [partner, setPartner] = useState<Partner | null>(null);

    useEffect(() => {
        async function fetchPartner() {
            if (id) {
                const res = await getPartner(id);
                setPartner(res?.data || null);
            }
        }
        fetchPartner();
    }, [id]);

    if (isLoading || !partner) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="text-lg text-muted-foreground">
                        Loading partner details...
                    </p>
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
            <div className="flex items-center">
                <Button
                    variant="link"
                    className="px-0 text-sm text-muted-foreground hover:text-primary"
                    onClick={() => navigate("/partnerlist")}
                >
                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                    Back to Partner List
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Partner Info</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Mobile No.</TableHead>
                                    <TableHead>Skills</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{partner.user.name}</TableCell>
                                    <TableCell>{partner.user.email}</TableCell>
                                    <TableCell>{partner.user.phone}</TableCell>

                                    {/* {partner.skills?.length ? (
                                            <ul className="list-disc list-inside space-y-1">
                                                {partner.skills.map((skill) => (
                                                    <li key={skill._id}>
                                                        {skill.skillName} ({skill.yearsOfExperience} yrs)
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span className="text-muted-foreground">No skills</span>
                                        )} */}
                                    <TableCell>
                                        {partner.skills?.length ? (
                                            <DropdownMenu.Root>
                                                <DropdownMenu.Trigger asChild>
                                                    <button className="inline-flex items-center px-3 py-1 bg-muted text-sm rounded[0.0] hover:bg-muted/70 transition">
                                                        View Skills
                                                        <ChevronDown className="ml-1 h-4 w-4" />
                                                    </button>
                                                </DropdownMenu.Trigger>

                                                <DropdownMenu.Content
                                                    className="z-50 min-w-[200px] rounded-md border bg-white p-1 text-sm shadow-md"
                                                    sideOffset={5}
                                                >
                                                    {partner.skills.map((skill) => (
                                                        <DropdownMenu.Item
                                                            key={skill._id}
                                                            className="flex justify-between items-center px-2 py-1.5 rounded-sm hover:bg-muted/40 cursor-default space-x-2"
                                                        >
                                                            <div className="flex flex-col border-0.1 border-red-800">
                                                                <span>{skill.skillName}</span>
                                                                <span
                                                                    className={
                                                                        skill.yearsOfExperience < 1
                                                                            ? "text-red-500 text-sm"
                                                                            : "text-muted-foreground text-sm"
                                                                    }
                                                                >
                                                                    {skill.yearsOfExperience} yrs
                                                                </span>
                                                            </div>

                                                            <button
                                                                //   onClick={(e) => {
                                                                //     e.stopPropagation(); 
                                                                //     openEditDialog(
                                                                //       partner.user._id,      
                                                                //       skill._id,            
                                                                //       skill.skillName,      
                                                                //       skill.yearsOfExperience 
                                                                //     );
                                                                //   }}
                                                                className="text-muted-foreground hover:text-primary"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </button>
                                                        </DropdownMenu.Item>
                                                    ))}

                                                </DropdownMenu.Content>
                                            </DropdownMenu.Root>
                                        ) : (
                                            <span className="text-muted-foreground">No skills</span>
                                        )}
                                    </TableCell>


                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Booking History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer Name</TableHead>
                                    <TableHead>Service Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Time Slot</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Total Amount</TableHead>
                                    <TableHead>Payment Status</TableHead>
                                    <TableHead>Created At</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                        No booking history available.
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

export default PartnerDetails;
