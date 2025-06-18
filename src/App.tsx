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
              <Route path="/customerbookinghistory" element={<BookingHistory/>}/>
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
