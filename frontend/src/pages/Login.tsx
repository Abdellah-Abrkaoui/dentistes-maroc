import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/admin");
    } catch (error: any) {
      console.error(error);
      alert("Google login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-xl rounded-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Sign in</h1>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/640px-Google_Favicon_2025.svg.png"
            alt="Google Icon"
            className="w-6 h-6"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
