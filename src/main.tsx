import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { AuthProvider } from "./context/AuthContext";
import { CustomerProvider } from "./context/CustomerContext";
import { AdminProvider } from "./context/AdminContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <AdminProvider>
                <CustomerProvider>
                    <App />
                </CustomerProvider>
            </AdminProvider>
        </AuthProvider>
    </React.StrictMode>
);
