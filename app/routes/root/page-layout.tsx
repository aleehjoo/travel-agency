import { logoutUser } from "~/appwrite/auth";
import { useNavigate } from "react-router";

const PageLayout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate("/sign-in");
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex gap-4">
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    Logout
                </button>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Dashboard
                </button>
            </div>
        </div>
    );
};

export default PageLayout;
