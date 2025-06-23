import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/layouts/Layout";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BookingHistory from "@/pages/Admin/BookingHistory";
import CustomerListdata from "@/pages/Admin/CustomerList";
import DocumentUpload from "@/pages/Partner/DocumentUpdate";
import { useAuth } from "@/context/AuthContext";
import CreateService from "@/pages/Customer/CreateService";
import ViewJobs from "./pages/Partner/ViewJobs";
import PartnerList from "./pages/Admin/PartnerList";
import PartnerDetails from "./pages/Admin/PartnerDetails";
function App() {
    const { user, token } = useAuth();
console.log(user)
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
                                <Navigate to="/create-service" replace />
                            ) : (
                                <Navigate to="/view-job" replace />
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
                                path="/bookinghistory/:id"
                                element={<BookingHistory />}
                               
                            />
                              <Route
                                path="/partnerDetails/:id"
                                element={<PartnerDetails />}
                            />
                        </>
                    ) : user?.role === "customer" ? (
                        <>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="/create-service" replace />
                                }
                            />
                            <Route
                                path="/create-service"
                                element={<CreateService />}
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
