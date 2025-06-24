import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, IndianRupee, Timer } from "lucide-react";
import { usePartner } from "@/context/PartnerContext";
import { useEffect, useState } from "react";
import { formatDateTime } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

function ViewJobs() {
    const { user } = useAuth();
    const { isLoading, fetchedJobData, fetchOpenJobs, acceptOpenJob } =
        usePartner();

    if (!user || !user.id) {
        return;
    }
    const [acceptingJobId, setAcceptingJobId] = useState<string | null>(null);

    async function AcceptJob(id: string) {
        if (!user?.id) return;
        setAcceptingJobId(id);
        try {
            await acceptOpenJob(id, user.id);
            await fetchOpenJobs();
        } catch (error) {
            console.error("Error accepting job", error);
        } finally {
            setAcceptingJobId(null);
        }
    }

    useEffect(() => {
        fetchOpenJobs();
    }, []);

    if (isLoading && !fetchedJobData) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="text-lg text-muted-foreground">
                        Loading jobs...
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
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">
                    Jobs Uploaded by Customers
                </h1>
            </div>

            {fetchedJobData?.length === 0 && (
                <Card className="w-full h-[70vh] flex justify-center items-center">
                    <div className="text-xl text-gray-400">
                        No open jobs found...
                    </div>
                </Card>
            )}

            {fetchedJobData?.map((booking) => (
                <Card key={booking._id}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-xl">
                                    {booking.service.name}
                                </CardTitle>
                                <CardTitle className="text-xl">
                                    {booking.service.description}
                                </CardTitle>
                                <CardDescription className="text-lg font-medium text-blue-600">
                                    {booking.location}
                                </CardDescription>
                            </div>
                            <Badge
                                variant={
                                    booking.status === "Active"
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {booking.status}
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Timer className="h-4 w-4" />
                                <span>Time-slot</span>
                                <span>{formatDateTime(booking.timeSlot)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <IndianRupee className="h-4 w-4" />
                                <span>{booking.totalAmount}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    Posted{" "}
                                    {new Date(
                                        booking.createdAt
                                    ).toLocaleDateString("en-us", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button onClick={() => AcceptJob(booking._id)}>
                                {acceptingJobId === booking._id
                                    ? "Accepting..."
                                    : "Accept Job"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </motion.div>
    );
}

export default ViewJobs;
