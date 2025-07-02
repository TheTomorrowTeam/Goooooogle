"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebaseconfig";

const Signin = () => {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [error, seterror] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    seterror("");
    try {
      if (!password) {
        seterror("Incorrect password");
        return;
      }
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User logged in successfully:", user);
          router.push("/profile");
        })
        .catch((error: Error) => {
          const errorMessage = error instanceof Error ? error.message : "An error occurred";
          seterror(errorMessage);
          console.error("Error during login:", errorMessage);
        });
    } catch (error: Error | any) {
      seterror(error instanceof Error ? error.message : "An error occurred");
      console.error("Error during login:", error);
    } finally {
      setloading(false);
    }
  };

  const handleForgotPassword = async()=>{
    setloading(true);
    seterror("");
    try {
      if(!email){
        console.log("Enter email");
        seterror("Enter email for resetting password!");
        return;
      }
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log("Password reset email sent successfully to :", email);
        })
        .catch((error: Error) => {
          const errorMessage = error instanceof Error ? error.message : "An error occurred";
          seterror(errorMessage);
          console.error("Error during sending password reset email:", errorMessage);
        });
    } catch (error: Error | any) {
      seterror(error instanceof Error ? error.message : "An error occurred");
      console.error("Error during sending password reset email:", error);
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white p-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <button
          disabled={loading}
          onClick={handleForgotPassword}
          className={`w-full bg-blue-500 text-white p-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending Reset link" : "Forgot Password"}
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
