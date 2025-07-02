'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification
} from "firebase/auth";
import { auth } from '@/config/firebaseconfig';
import googleprovider from '@/providers/googleprovider';
import { gsap } from 'gsap';

const Signup = () => {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [confirmpassword, setconfirmpassword] = useState<string>("");
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

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    seterror("");
    try {
      if (password !== confirmpassword) {
        seterror("Passwords do not match");
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          sendEmailVerification(user)
            .then(() => {
              console.log("Verification email sent to the user:", user);
            })
            .catch((error: Error) => {
              const errorMessage = error instanceof Error ? error.message : "An error occurred";
              seterror(errorMessage);
              console.error("Error during verification email:", errorMessage);
            });
          console.log("User signed up successfully:", user);
          router.push("/signin");
        })
        .catch((error: Error) => {
          const errorMessage = error instanceof Error ? error.message : "An error occurred";
          seterror(errorMessage);
          console.error("Error during signup:", errorMessage);
        });
    } catch (error: Error | any) {
      seterror(error instanceof Error ? error.message : "An error occurred");
      console.error("Error during signup:", error);
    } finally {
      setloading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      signInWithPopup(auth, googleprovider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (!credential) {
            console.log("No credentials received during Google sign-in");
          }
          const token = credential?.accessToken;
          const user = result.user;
          console.log("User logged in with Google successfully:", user);
          router.push("/profile");
        }).catch((error) => {
          const errorMessage = error instanceof Error ? error.message : "An error occurred";
          seterror(errorMessage);
          console.error("Error during signup:", errorMessage);
        });
    } catch (error: Error | any) {
      seterror(error instanceof Error ? error.message : "An error occurred");
      console.error("Error during signup:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/10 bg-opacity-60 z-0"></div>
      <div
        ref={formRef}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg overflow-hidden"
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow-[2px_2px_3px_rgba(0,0,0,0.8)]">
          Sign Up
        </h2>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-white mb-1 drop-shadow-sm">Email</label>
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
            <label className="block text-sm font-semibold text-white mb-1 drop-shadow-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-1 drop-shadow-sm">Confirm Password</label>
            <input
              type="password"
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-white drop-shadow-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleSignInWithGoogle}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold transition-all"
        >
          Sign Up with Google
        </button>

        <p className="mt-5 text-sm font-bold text-center text-white drop-shadow-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-300 hover:text-blue-400">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
