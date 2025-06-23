import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectItem,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useCustomer } from "@/context/CustomerContext";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Autocomplete from "react-google-autocomplete";

function CreateBooking() {
    const { user } = useAuth();
    const { toast } = useToast();
    const { createNewBooking, isLoading, services, fetchAllServices } =
        useCustomer();
    const [coords, setCoords] = useState({ lat: 0, lng: 0 });
    const [addressViaAutoComplete, setAddressViaAutoComplete] = useState("");
    // const [addressViaGeoLocation, setAddressViaGeoLocation] = useState("");
    const autocompleteRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState<{
        service: string;
        timeSlot: Date | null;
        location: string;
        totalAmount: number | null;
    }>({
        service: "",
        timeSlot: null,
        location: "",
        totalAmount: null,
    });
    const [loading, setLoading] = useState(false);

    const createBooking = async () => {
        const location = addressViaAutoComplete;
        if (!data.service || !data.timeSlot || !data.totalAmount || !location) {
            toast({
                title: "Missing fields",
                description: "Please fill all required fields",
                variant: "destructive",
            });
            return;
        }

        if (!user?.id) {
            toast({
                title: "Authentication Error",
                description: "You must be logged in to create a booking.",
                variant: "destructive",
            });
            return;
        }

        try {
            setLoading(true);
            await createNewBooking({
                service: data.service,
                timeSlot: data.timeSlot,
                location: location,
                totalAmount: data.totalAmount,
            });

            setData({
                service: "",
                timeSlot: null,
                location: "",
                totalAmount: null,
            });
            setAddressViaAutoComplete("");
            // setAddressViaGeoLocation("");
            setCoords({ lat: 0, lng: 0 });

            if (autocompleteRef.current) {
                autocompleteRef.current.value = "";
            }

            toast({
                title: "Booking created successfully",
                description: "Your booking has been created successfully.",
            });
        } catch (error) {
            toast({
                title: "Failed to create booking",
                description: "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // const handleUseMyLocation = () => {
    //     if (addressViaAutoComplete) {
    //         toast({
    //             title: "Location already selected",
    //             description:
    //                 "Please clear the autocomplete location first to use geolocation.",
    //             variant: "destructive",
    //         });
    //         return;
    //     }

    //     navigator.geolocation.getCurrentPosition(
    //         async (position) => {
    //             const { latitude, longitude } = position.coords;
    //             setCoords({ lat: latitude, lng: longitude });

    //             const res = await fetch(
    //                 `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
    //                 {
    //                     headers: {
    //                         "User-Agent": "Amit pandey",
    //                     },
    //                 }
    //             );

    //             if (!res.ok) {
    //                 toast({
    //                     title: "Failed to fetch address",
    //                     description:
    //                         "Could not retrieve address details. Please try again.",
    //                     variant: "destructive",
    //                 });
    //                 return;
    //             }

    //             const data = await res.json();
    //             const address = data.display_name;
    //             setAddressViaGeoLocation(address);
    //             setData((prev) => ({
    //                 ...prev,
    //                 location: address,
    //             }));
    //             toast({
    //                 title: "Location set successfully",
    //                 description: "Your current location has been detected.",
    //             });
    //         },
    //         (error) => {
    //             toast({
    //                 title: "Location permission denied",
    //                 description:
    //                     "Please allow location access to use this feature.",
    //                 variant: "destructive",
    //             });
    //             console.error(error);
    //         }
    //     );
    // };

    const handleClearAutoComplete = () => {
        setAddressViaAutoComplete("");
        if (autocompleteRef.current) {
            autocompleteRef.current.value = "";
        }
        toast({
            title: "Location cleared",
            description: "Autocomplete location has been removed.",
        });
    };

    // const handleClearGeoLocation = () => {
    //     setAddressViaGeoLocation("");
    //     setCoords({ lat: 0, lng: 0 });
    //     toast({
    //         title: "Location cleared",
    //         description: "Geolocation has been removed.",
    //     });
    // };

    useEffect(() => {
        fetchAllServices();
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    <p className="text-lg text-muted-foreground">Loading...</p>
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
                    <CardTitle>Create Booking</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="space-y-2 mt-2">
                        <Label>Service Name</Label>
                        <Select
                            value={data.service}
                            onValueChange={(value) =>
                                setData((prev) => ({ ...prev, service: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                                {services.map((service) => (
                                    <SelectItem
                                        key={service._id}
                                        value={service._id}
                                    >
                                        {service.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 mt-2">
                        <Label>Time Slot</Label>
                        <Input
                            type="datetime-local"
                            value={
                                data.timeSlot
                                    ? new Date(data.timeSlot)
                                          .toISOString()
                                          .slice(0, 16)
                                    : ""
                            }
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    timeSlot: e.target.value
                                        ? new Date(e.target.value)
                                        : null,
                                }))
                            }
                        />
                    </div>
                    <div className="space-y-2 mt-2">
                        <Label>Total Amount</Label>
                        <Input
                            type="number"
                            placeholder="Enter amount..."
                            value={data.totalAmount || ""}
                            onWheel={(e) =>
                                (e.target as HTMLInputElement).blur()
                            }
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    totalAmount: e.target.value
                                        ? Number(e.target.value)
                                        : null,
                                }))
                            }
                        />
                    </div>
                    <div className="space-y-2 mt-2">
                        <Label>Location</Label>
                        <Autocomplete
                            ref={autocompleteRef}
                            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                            onPlaceSelected={(place) => {
                                // if (addressViaGeoLocation) {
                                //     toast({
                                //         title: "Location already selected",
                                //         description:
                                //             "Please clear the geolocation first to use autocomplete.",
                                //         variant: "destructive",
                                //     });
                                //     return;
                                // }

                                const city = place?.formatted_address || "";
                                setAddressViaAutoComplete(city);
                                setData((prev) => ({
                                    ...prev,
                                    location: city,
                                }));
                                toast({
                                    title: "Location set successfully",
                                    description:
                                        "Address selected via autocomplete.",
                                });

                                if (autocompleteRef.current) {
                                    autocompleteRef.current.value = "";
                                }
                            }}
                            style={{
                                display: "flex",
                                height: "2.5rem",
                                width: "100%",
                                borderRadius: "0.375rem",
                                border: "1px solid hsl(var(--input))",
                                backgroundColor: "hsl(var(--background))",
                                padding: "0.5rem 0.75rem",
                                fontSize: "0.875rem",
                                outline: "none",
                                boxSizing: "border-box",
                                color: "inherit",
                                opacity: 1,
                                cursor: "text",
                            }}
                            options={{
                                types: ["geocode"],
                            }}
                        />
                    </div>
                    {addressViaAutoComplete && (
                        <div className="space-y-2 bg-background mt-2 p-2 text-foreground text-sm flex justify-between w-[50vw] text-nowrap">
                            {addressViaAutoComplete}
                            <X
                                className="h-4 w-4 hover:h-5 hover:cursor-pointer"
                                onClick={handleClearAutoComplete}
                            />
                        </div>
                    )}
                    {/* <div className="ml-1 mt-2 flex items-center justify-center text-gray-500">
                        OR
                    </div> */}
                    {/* <div className="space-y-2 mt-2 flex flex-col">
                        <Button variant="outline" onClick={handleUseMyLocation}>
                            📍 Use My Current Location
                        </Button>
                        {addressViaAutoComplete === "" &&
                            addressViaGeoLocation && (
                                <div className="flex gap-3 items-center justify-center text-center">
                                    <span className="text-gray-500 text-center">
                                        {addressViaGeoLocation}
                                    </span>
                                    <X
                                        className="h-4 w-4 hover:h-5 hover:cursor-pointer"
                                        onClick={handleClearGeoLocation}
                                    />
                                </div>
                            )}
                    </div> */}
                    <div className="flex justify-end mt-4">
                        <Button
                            type="submit"
                            variant="blue"
                            onClick={createBooking}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default CreateBooking;
