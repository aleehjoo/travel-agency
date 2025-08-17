import { useState } from "react";
import { logoutUser } from "~/appwrite/auth";
import { useNavigate } from "react-router";

const PageLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logoutUser();
            navigate("/sign-in");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDashboard = () => {
        setLoading(true);
        // small delay so the loading screen is visible
        setTimeout(() => {
            navigate("/dashboard");
            setLoading(false);
        }, 800);
    };

    return (
        <div className="h-screen flex items-center justify-center relative">
            {/* Loading overlay */}
            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-50">
                    <img
                        src="/assets/icons/loader.svg"
                        alt="Loading..."
                        className="w-10 h-10 animate-spin"
                    />
                    <span className="mt-3 text-gray-700 font-medium">Loading...</span>
                </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                    Logout
                </button>

                <button
                    onClick={handleDashboard}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    Dashboard
                </button>
            </div>
        </div>
    );
};

export default PageLayout;
