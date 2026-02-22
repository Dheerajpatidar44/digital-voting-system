import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Vote", path: "/vote" },
        { name: "Results", path: "/results" },
    ];

    return (
        <nav className="bg-blue-600 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-white text-2xl font-bold tracking-wide">
                    🗳️ DigitalVote
                </Link>

                {/* Links */}
                <div className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white font-semibold border-b-2 border-white pb-1"
                                    : "text-gray-200 hover:text-white transition"
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* User Auth Buttons */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-gray-100">Hello, {user.name}</span>
                            <button
                                onClick={logout}
                                className="bg-white text-blue-600 px-3 py-1 rounded-md font-semibold hover:bg-gray-100 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-100 hover:text-white font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-white text-blue-600 px-3 py-1 rounded-md font-semibold hover:bg-gray-100 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button (Optional Future Update) */}
            </div>
        </nav>
    );
};

export default Navbar;
