import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/layouts/Layout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BookingHistory from "@/pages/Admin/BookingHistory";
import CustomerListdata from "@/pages/Admin/CustomerList";
import DocumentUpload from "@/pages/Partner/DocumentUpdate";
import { useAuth } from "@/context/AuthContext";
import CreateService from "@/pages/Customer/CreateService";
import PartnerList from "./pages/Admin/PartnerList";
function App() {
    const { user, token } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        token ? (
                            <Navigate to="/customerlist" replace />
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
                            <Route path="/dashboard" element={<Dashboard />} />
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
                        </>
                    ) : user?.role === "customer" ? (
                        <>
                            <Route
                                path="/create-booking"
                                element={<CreateService />}
                            />
                        </>
                    ) : (
                        <>
                            <Route
                                path="/documentUpload"
                                element={<DocumentUpload />}
                            />
                        </>
                    )}
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
