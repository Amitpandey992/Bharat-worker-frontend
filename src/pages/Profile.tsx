import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/shared/types";
import { AuthService } from "@/services/auth.service";

const Profile = () => {
  const { user, updateUserDetails } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    emailAddress: user?.emailAddress || "",
    mobileNumber: user?.mobileNumber || "",
  });

  // Set initial form data based on user
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        emailAddress: user?.emailAddress || "",
        mobileNumber: user?.mobileNumber || "",
      });
    }
  }, [user]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedUser = await AuthService.updateUser(
        {
          userId: user?.userId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailAddress: formData.emailAddress,
          mobileNumber: formData.mobileNumber,
        },
        user?.accessToken || ""
      );
      if (updatedUser.success && updatedUser.data) {
        toast({
          variant: "default",
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
        updateUserDetails({
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailAddress: formData.emailAddress,
          mobileNumber: formData.mobileNumber,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
            <div className="flex-1">
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleFormChange}
                      className="focus-visible:ring-blue/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="lastName"
                      value={formData.lastName}
                      onChange={handleFormChange}
                      className="focus-visible:ring-blue/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="emailAddress"
                      type="email"
                      value={formData.emailAddress}
                      onChange={handleFormChange}
                      className="focus-visible:ring-blue/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      name="mobileNumber"
                      type="text"
                      pattern="[0-9]*"
                      minLength={10}
                      maxLength={10}
                      value={formData.mobileNumber}
                      onChange={handleFormChange}
                      className="focus-visible:ring-blue/50"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button variant="blue" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center">
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                        Updating...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Profile;
