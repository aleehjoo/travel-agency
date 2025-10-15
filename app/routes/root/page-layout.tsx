import { useMemo, useState, useEffect } from "react";
import { logoutUser } from "~/appwrite/auth";
import { account } from "~/appwrite/client";
import { Outlet, useNavigate, useNavigation } from "react-router";

const PageLayout = () => {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const [isProcessingLogout, setIsProcessingLogout] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const isNavigating = useMemo(() => navigation.state !== "idle", [navigation.state]);
    const isLoading = isProcessingLogout || isNavigating || isCheckingAuth;

    // Check authentication status on component mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await account.get();
                setIsAuthenticated(!!user);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsCheckingAuth(false);
            }
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        setIsProcessingLogout(true);
        try {
            await logoutUser();
            navigate("/sign-in");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            // In most cases this component will unmount after navigate,
            // but keep state clean in case of errors
            setIsProcessingLogout(false);
        }
    };

    const handleDashboard = () => {
        if (isAuthenticated) {
            navigate("/dashboard");
        } else {
            navigate("/sign-in");
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-white to-slate-50">
            {/* Global loading overlay tied to navigation state */}
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-50">
                    <img
                        src="/assets/icons/loader.svg"
                        alt="Loading content, please wait"
                        className="w-10 h-10 animate-spin"
                        width="40"
                        height="40"
                    />
                    <span className="mt-3 text-gray-700 font-medium">Loading...</span>
                </div>
            )}

            {/* Simple header with actions */}
            <header className="w-full border-b border-light-200 bg-white/70 backdrop-blur sticky top-0 z-10">
                <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img 
                            src="public/assets/icons/logo.svg" 
                            alt="Tourvisto travel agency logo" 
                            className="h-8 w-auto" 
                            width="32"
                            height="32"
                            onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}}
                        />
                        <span className="text-lg font-semibold text-dark-100">Tourvisto</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDashboard}
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isAuthenticated ? "Dashboard" : "Sign In"}
                        </button>
                        {isAuthenticated && (
                            <button
                                onClick={handleLogout}
                                disabled={isLoading}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Page content */}
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default PageLayout;
