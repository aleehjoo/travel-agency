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

    // Prevent scrolling and user interaction during loading
    useEffect(() => {
        if (isLoading) {
            // Add loading class to html element
            document.documentElement.classList.add('loading-active');
            // Prevent scrolling (scrollbar is already hidden globally)
            document.body.style.overflow = 'hidden';
            // Prevent any pointer events on the body
            document.body.style.pointerEvents = 'none';
            // Add class to html element for additional scroll prevention
            document.documentElement.style.overflow = 'hidden';
        } else {
            // Remove loading class
            document.documentElement.classList.remove('loading-active');
            // Restore normal behavior
            document.body.style.overflow = 'unset';
            document.body.style.pointerEvents = 'auto';
            document.documentElement.style.overflow = 'unset';
        }

        // Cleanup function to ensure we always restore scroll
        return () => {
            document.documentElement.classList.remove('loading-active');
            document.body.style.overflow = 'unset';
            document.body.style.pointerEvents = 'auto';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isLoading]);

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
                <div 
                    className="fixed inset-0 flex flex-col items-center justify-center bg-white/90 z-[9999] overflow-hidden"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9999,
                        pointerEvents: 'auto'
                    }}
                    onWheel={(e) => e.preventDefault()}
                    onTouchMove={(e) => e.preventDefault()}
                    onScroll={(e) => e.preventDefault()}
                >
                    <div className="flex flex-col items-center justify-center">
                        <img
                            src="/assets/icons/loader.svg"
                            alt="Loading content, please wait"
                            className="w-10 h-10 animate-spin"
                            width="40"
                            height="40"
                        />
                        <span className="mt-3 text-gray-700 font-medium">Loading...</span>
                    </div>
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
