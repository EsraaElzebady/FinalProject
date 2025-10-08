import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import useAuth from "../../Store/AuthStore";
import { useWishlistStore } from "../../Store/useWishlistStore";
import { useCartStore } from "../../Store/useCartStore";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { clearWishlist } = useWishlistStore();
  const { clearCart } = useCartStore();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserInfo(decoded);
      } catch (err) {
        console.error("Error decoding JWT:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    clearWishlist();
    clearCart();
    logout();
    navigate("/login", { replace: true });
  };

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">No user info found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="space-y-2">
        <p><span className="font-semibold">ID:</span> {userInfo.id || userInfo.user?.id}</p>
        <p><span className="font-semibold">Email:</span> {userInfo.email || userInfo.user?.email}</p>
        <p><span className="font-semibold">Username:</span> {userInfo.username || userInfo.user?.username}</p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full py-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
