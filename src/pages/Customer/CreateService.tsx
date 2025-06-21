import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCustomer } from "@/context/CustomerContext";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import Autocomplete from "react-google-autocomplete";

function CreateService() {
    const { isLoading } = useCustomer();
    const { toast } = useToast();
    const [coords, setCoords] = useState({ lat: 0, lng: 0 });
    const [addressViaAutoComplete, setAddressViaAutoComplete] = useState("");
    const [addressViaGeoLocation, setAddressViaGeoLocation] = useState("");
    const autocompleteRef = useRef<HTMLInputElement>(null);

    const handleUseMyLocation = () => {
        if (addressViaAutoComplete) {
            toast({
                title: "Location already selected",
                description:
                    "Please clear the autocomplete location first to use geolocation.",
                variant: "destructive",
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setCoords({ lat: latitude, lng: longitude });

                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                );
                const data = await res.json();
                setAddressViaGeoLocation(data.display_name);
                toast({
                    title: "Location set successfully",
                    description: "Your current location has been detected.",
                });
            },
            (error) => {
                toast({
                    title: "Location permission denied",
                    description:
                        "Please allow location access to use this feature.",
                    variant: "destructive",
                });
                console.error(error);
            }
        );
    };

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

    const handleClearGeoLocation = () => {
        setAddressViaGeoLocation("");
        setCoords({ lat: 0, lng: 0 });
        toast({
            title: "Location cleared",
            description: "Geolocation has been removed.",
        });
    };

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
                    <CardTitle>Create service</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="space-y-2 mt-2">
                        <Label>Service Name</Label>
                        <Input placeholder="Enter service name.." />
                    </div>
                    <div className="space-y-2 mt-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Enter description" />
                    </div>
                    <div className="space-y-2 mt-2">
                        <Label>Price</Label>
                        <Input type="number" placeholder="Enter amount..." />
                    </div>
                    <div className="space-y-2 mt-2">
                        <Label>Location</Label>
                        <Autocomplete
                            ref={autocompleteRef}
                            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                            onPlaceSelected={(place) => {
                                if (addressViaGeoLocation) {
                                    toast({
                                        title: "Location already selected",
                                        description:
                                            "Please clear the geolocation first to use autocomplete.",
                                        variant: "destructive",
                                    });
                                    return;
                                }

                                const city = place?.formatted_address || "";
                                setAddressViaAutoComplete(city);
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
                    {addressViaGeoLocation === "" && addressViaAutoComplete && (
                        <div className="space-y-2 bg-background mt-2 p-2 text-foreground text-sm flex justify-between w-[20vw]">
                            {addressViaAutoComplete}
                            <X
                                className="h-4 w-4 hover:h-5 hover:cursor-pointer"
                                onClick={handleClearAutoComplete}
                            />
                        </div>
                    )}
                    <div className="ml-1 mt-2 flex items-center justify-center text-gray-500">
                        OR
                    </div>
                    <div className="space-y-2 mt-2 flex flex-col">
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
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default CreateService;
