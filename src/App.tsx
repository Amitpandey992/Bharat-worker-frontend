import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider} from "@/context/AuthContext";

import Layout from "@/layouts/Layout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Admins from "@/pages/Admins";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
// import Bookinghistory from "./pages/Bookinghistory";
import CustomerListdata from "./pages/CustomerListdata";
import { CustomerProvider } from "./context/CustomerContext";
import BookingHistory from "./pages/Customer/BookingHistory";
import BookingComplaint from "./pages/Customer/BookingComplaint";
import PartnerSkill from "./pages/Partner/PartnerSkill";
import PartnerComplent from "./pages/Partner/PartnerComplent";
import DocumentUpload from "./pages/Partner/DocumentUpdate";
function App() {

  return (
    <AuthProvider>
      <CustomerProvider>
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
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admins" element={<Admins />} />
              {/* <Route path="/bookinghistory" element={<Bookinghistory />} /> */}
              <Route path="/customerlistdata" element={<CustomerListdata />} />
              <Route path="/customer-booking-history" element={<BookingHistory/>}/>
              <Route path="/customer-booking-complaint" element={<BookingComplaint/>}/>
              <Route path="/partner-skill" element={<PartnerSkill/>}/>
              <Route path="/partner-complent" element={<PartnerComplent/>}/>
              <Route path="/document-uplode" element={<DocumentUpload/>}/>

            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </CustomerProvider>
    </AuthProvider>
  );
}

export default App;
