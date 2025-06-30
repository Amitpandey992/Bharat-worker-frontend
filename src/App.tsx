import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/layouts/Layout";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
// import BookingHistory from "@/pages/Admin/CustomerDetails";
import CustomerDetails from "./pages/Admin/CustomerDetails";
import CustomerListdata from "@/pages/Admin/CustomerList";
import DocumentUpload from "@/pages/Partner/DocumentUpdate";
import { useAuth } from "@/context/AuthContext";
import CreateBooking from "@/pages/Customer/CreateBooking";
import ViewJobs from "./pages/Partner/ViewJobs";
import PartnerList from "./pages/Admin/PartnerList";
import PartnerDetails from "./pages/Admin/PartnerDetails";
import BookingList from "./pages/Customer/BookingList";
import PartnerJobList from "./pages/Partner/PartnerJobList";
import Skills from "./pages/Partner/Skills";
import AdminBookingList from "./pages/Admin/AdminBookingList";
import Services from "./pages/Admin/Services";
import PaymentHistory from "./pages/Admin/PaymentHistory";
import PaymentApprove from "./pages/Admin/PaymentApprove";
import PendingWithdrawal from "./pages/Admin/PendingWithdrawal";
import PartnerTraining from "./pages/Partner/PartnerTraining";
import SkillValidationQuiz from "./pages/Partner/SkillValidationQuiz";
import PartnerPerformance from "./pages/Partner/PartnerPerformance";
function App() {
    const { user, token } = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        token ? (
                            user?.role === "admin" ? (
                                <Navigate to="/customerlist" replace />
                            ) : user?.role === "customer" ? (
                                <Navigate to="/bookingList" replace />
                            ) : (
                                <Navigate to="/partnerJobList" replace />
                            )
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    {user?.role === "admin" ? (
                        <>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="/customerlist" replace />
                                }
                            />
                            <Route
                                path="/customerlist"
                                element={<CustomerListdata />}
                            />
                            <Route
                                path="/partnerlist"
                                element={<PartnerList />}
                            />
                            <Route
                                path="/customerlist/:id"
                                element={<CustomerDetails />}
                            />
                            <Route
                                path="/partnerlist/:id"
                                element={<PartnerDetails />}
                            />
                             <Route
                                path="/skills"
                                element={<Skills />}
                            />
                            <Route
                                path="/adminBookingList"
                                element={<AdminBookingList />}
                            />
                              <Route
                                path="/adminServices"
                                element={<Services />}
                            />
                            <Route
                                path="/paymentHistory"
                                element={<PaymentHistory />}
                            />
                               <Route
                                path="/PaymentApprove"
                                element={<PaymentApprove />}
                            />
                              <Route
                                path="/pendingWithdrawal"
                                element={<PendingWithdrawal />}
                            />
                              <Route
                                    path="/partnerTraining"
                                    element={<PartnerTraining/>}
                                />
                                 <Route
                                    path="/skillValidationQuiz"
                                    element={<SkillValidationQuiz/>}
                                />
                                  <Route
                                    path="/partnerPerformance"
                                    element={<PartnerPerformance/>}
                                />
                            
                        </>
                    ) : user?.role === "customer" ? (
                        <>
                            <Route
                                path="/"
                                element={<Navigate to="/bookingList" replace />}
                            />
                            <Route
                                path="/bookingList"
                                element={<BookingList />}
                            />
                            <Route
                                path="/create-booking"
                                element={<CreateBooking />}
                            />
                        </>
                    ) : (
                        user?.role === "partner" && (
                            <>
                                <Route
                                    path="/documentUpload"
                                    element={<DocumentUpload />}
                                />
                                <Route
                                    path="/view-jobs"
                                    element={<ViewJobs />}
                                />
                                <Route
                                    path="/partnerJobList"
                                    element={<PartnerJobList />}
                                />
                                 <Route
                                    path="/partnerTraining"
                                    element={<PartnerTraining/>}
                                />
                            </>
                        )
                    )}
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
