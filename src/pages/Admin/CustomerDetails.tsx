import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import { PaginatedResponse } from "@/shared/interfaces";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeftIcon } from "lucide-react";
import { CustomerList } from "@/shared/types";
import { useAdmin } from "@/context/AdminContext";
type Customer = CustomerList["customers"][number];

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCustomer, getBookingsByCustomer, customerBookingData, isLoading } =
    useAdmin();
     const [paginationData, setPaginationData] = useState<PaginatedResponse>({
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            totalPages: 0,
        });
  const [customer, setCustomer] = useState<Customer | null>(null);

  async function fetchCustomer() {
        if (id) {
            const response = await getCustomer(id);
            setCustomer(response?.data);
        }
    }
    useEffect(() => {
        fetchCustomer();
    }, []);


 useEffect(() => {
        getBookingsByCustomer(
            id,
            paginationData.currentPage,
            paginationData.pageSize
        );
    }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg text-muted-foreground">
            Loading booking history...
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
          onClick={() => navigate("/customerlist")}
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Customers
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Name</TableHead>
                  <TableHead className="w-[250px]">Email</TableHead>
                  <TableHead className="w-[250px]">Mobile No.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{customer?.user.name}</TableCell>
                  <TableCell>{customer?.user.email}</TableCell>
                  <TableCell>{customer?.user.phone}</TableCell>
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
                  <TableHead>Partner Name</TableHead>
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
                {customerBookingData?.bookings &&
                customerBookingData?.bookings.length > 0 ? (
                  customerBookingData?.bookings.map((booking: any) => (
                      console.log(booking),
                    <TableRow key={booking.createdAt}>
                      <TableCell>{booking.partner?.name || "N/A"}</TableCell>
                      <TableCell>
                        {booking.service?.name || booking.service?._id || "N/A"}
                      </TableCell>
                      <TableCell>{booking.status}</TableCell>
                      <TableCell>
                        {new Date(booking.timeSlot).toLocaleString()}
                      </TableCell>
                      <TableCell>{booking.location}</TableCell>
                      <TableCell>₹{booking.totalAmount}</TableCell>
                      <TableCell>{booking.paymentStatus}</TableCell>
                      <TableCell>
                        {new Date(booking.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No booking history available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerDetails;
