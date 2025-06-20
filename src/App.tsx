import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/context/AuthContext";

import Layout from "@/layouts/Layout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Admins from "@/pages/Admins";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BookingHistory from "./pages/Customer/BookingHistory";
import CustomerListdata from "./pages/Customer/CustomerList";
import DocumentUpload from "./pages/Partner/DocumentUpdate";
import PartnerSkill from "./pages/Partner/PartnerSkill";
function App() {
    const { user } = useAuth();
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admins" element={<Admins />} />
                    <Route
                        path="/bookinghistory/:id"
                        element={<BookingHistory />}
                    />
                    <Route
                        path="/customerlistdata"
                        element={<CustomerListdata />}
                    />
                    <Route
                        path="/customerbookinghistory"
                        element={<BookingHistory />}
                    />
                      <Route
                        path="/documentUpload"
                        element={<DocumentUpload />}
                    />
                     <Route
                        path="/partner-skill"
                        element={<PartnerSkill />}
                    />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
