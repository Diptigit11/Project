import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const docRef = doc(db, "Users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such user document!");
          }
        } catch (error) {
          console.log("Error fetching user data:", error.message);
        }
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">User Profile</h2>

        {userData ? (
          <div className="text-left">
            <p className="mb-2">
              <strong>First Name:</strong> {userData.firstName}
            </p>
            <p className="mb-2">
              <strong>Last Name:</strong> {userData.lastName}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {userData.email}
            </p>
            {/* You can show a default or uploaded photo here if needed */}
            {/* <img src={userData.photo || "default.jpg"} alt="User" /> */}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-gradient-to-r from-red-400 to-pink-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
