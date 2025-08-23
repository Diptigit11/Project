import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


function SignInWithGoogle() {
    const navigate = useNavigate();
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });

        toast.success("User logged in successfully", {
          position: "top-center",
        });

        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="mt-6 text-center">
      <p className="text-gray-500 mb-4 text-sm">— Or continue with —</p>
      <button
        onClick={googleLogin}
        className="flex items-center justify-center w-full max-w-xs mx-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition"
      >
        <svg
          className="w-5 h-5 mr-2"
          viewBox="0 0 48 48"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.6 0 6.3 1.5 7.7 2.8l5.7-5.6C33.7 3.2 29.2 1 24 1 14.9 1 7.6 6.9 4.9 15.1l6.8 5.3C13 15 18.1 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.5 24.5c0-1.5-.1-2.9-.4-4.2H24v8h12.7c-.6 3.2-2.4 5.9-5.1 7.7v6.4h8.3c4.8-4.4 6.6-10.9 6.6-17.9z"
          />
          <path
            fill="#FBBC05"
            d="M11.7 28.2c-.6-1.6-.9-3.3-.9-5s.3-3.4.9-5l-6.8-5.3C3.4 16.5 2 20.1 2 24s1.4 7.5 3.9 10.3l6.8-6.1z"
          />
          <path
            fill="#34A853"
            d="M24 46c5.2 0 9.5-1.7 12.6-4.6l-8.3-6.4c-2.1 1.4-4.8 2.3-8.3 2.3-5.9 0-11-4-12.7-9.5l-6.8 6.1C7.6 41.1 14.9 46 24 46z"
          />
          <path fill="none" d="M0 0h48v48H0z" />
        </svg>
        <span className="text-sm font-medium text-gray-700">
          Sign in with Google
        </span>
      </button>
    </div>
  );
}

export default SignInWithGoogle;
