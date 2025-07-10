"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/config/firebaseconfig";
import { gsap } from "gsap";

const Signin = () => {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [error, seterror] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
  }, []);

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
          const errorMessage =
            error instanceof Error ? error.message : "An error occurred";
          seterror(errorMessage);
          console.error("Error during login:", errorMessage);
        });
    } catch (error: unknown) {
      seterror(error instanceof Error ? error.message : "An error occurred");
      console.error("Error during login:", error);
    } finally {
      setloading(false);
    }
  };

  const handleForgotPassword = async () => {
    setloading(true);
    seterror("");
    try {
      if (!email) {
        console.log("Enter email");
        seterror("Enter email for resetting password!");
        return;
      }
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log("Password reset email sent successfully to :", email);
        })
        .catch((error: Error) => {
          const errorMessage =
            error instanceof Error ? error.message : "An error occurred";
          seterror(errorMessage);
          console.error(
            "Error during sending password reset email:",
            errorMessage
          );
        });
    } catch (error: unknown) {
      seterror(error instanceof Error ? error.message : "An error occurred");
      console.error("Error during sending password reset email:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div
        ref={formRef}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg p-8 w-full max-w-md relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-lg"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow-[2px_2px_3px_rgba(0,0,0,0.8)]">
            Sign In
          </h2>
          {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSignin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-1 drop-shadow-[2px_2px_3px_rgba(0,0,0,0.8)]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-1 drop-shadow-[2px_2px_3px_rgba(0,0,0,0.8)]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all font-semibold ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <button
            disabled={loading}
            onClick={handleForgotPassword}
            className={`w-full mt-3 py-3 text-white rounded-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 transition-all font-semibold ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Sending Reset link..." : "Forgot Password"}
          </button>
          <p className="mt-5 text-sm font-bold text-center text-white drop-shadow-[2px_2px_3px_rgba(0,0,0,0.8)]">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-300 hover:text-blue-400"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
