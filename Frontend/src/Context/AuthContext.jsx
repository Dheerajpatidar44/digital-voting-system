import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext(); // ✅ Named export matches Navbar import

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // ✅ Register
    const register = async (name, email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
            });
            setUser(res.data.user);
            toast.success("Registered successfully!");
            return { success: true };
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
            return { success: false, message: err.message };
        }
    };

    // ✅ Login
    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });
            setUser(res.data.user);
            toast.success("Login successful!");
            return { success: true };
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
            return { success: false, message: err.message };
        }
    };

    // ✅ Logout
    const logout = () => {
        setUser(null);
        toast.info("Logged out");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
