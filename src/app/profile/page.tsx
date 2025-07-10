"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import { auth } from "@/config/firebaseconfig";
import { gsap } from "gsap";

const Profile = () => {
  const [loading, setloading] = useState<boolean>(false);
  const [email, setemail] = useState<string>("");
  const [displayname, setdisplayname] = useState<string>("");
  const [photourl, setphotourl] = useState<string>("");
  const [isemailverified, setisemailverified] = useState<boolean>(false);
  const [error, seterror] = useState<string>("");
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auth) {
      seterror("Authentication not initialized");
      return;
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName || "";
        const email = user.email || "";
        const photoURL = user.photoURL || "";
        const emailVerified = user.emailVerified || false;
        setemail(email);
        setdisplayname(displayName);
        setphotourl(photoURL);
        setisemailverified(emailVerified);
        console.log("User is signed in! : ", user);
      } else {
        seterror("User not signed in!");
        console.log("User not signed in!");
      }
    });

    gsap.fromTo(
      cardRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  const handleEmailVerification = async () => {
    setloading(true);
    seterror("");

    if (!auth) {
      seterror("Authentication not initialized");
      setloading(false);
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        seterror("No user found to send verification email!");
      } else {
        await sendEmailVerification(user);
        console.log("Verification email sent to the user:", user);
      }
    } catch (error: unknown) {
      seterror(error instanceof Error ? error.message : "An error occurred");
      console.error("Error during email verification:", error);
    } finally {
      setloading(false);
    }
  };

  const handleSignout = async () => {
    setloading(true);
    seterror("");

    if (!auth) {
      seterror("Authentication not initialized");
      setloading(false);
      return;
    }

    try {
      await signOut(auth);
      console.log("User logged out successfully");
      router.push("/signin");
    } catch (error: unknown) {
      seterror(error instanceof Error ? error.message : "An error occurred");
      console.error("Error during logout:", error);
    } finally {
      setloading(false);
    }
  };

  const handleProfileUpdate = async () => {
    setloading(true);
    seterror("");

    if (!auth) {
      seterror("Authentication not initialized");
      setloading(false);
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        seterror("No user found to update profile!");
      } else {
        await updateProfile(user, {
          displayName: displayname || "",
          photoURL: photourl || ""
        });
        console.log("Profile updated successfully:", user);
      }
    } catch (error: unknown) {
      seterror(error instanceof Error ? error.message : "An error occurred");
      console.error("Error during profile update:", error);
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
        ref={cardRef}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl overflow-hidden"
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow-[2px_2px_3px_rgba(0,0,0,0.8)]">
          Profile
        </h2>

        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        {loading && <p className="text-blue-300 mb-4 text-center">Loading...</p>}

        <div className="space-y-4 text-white">
          <div>
            <label className="block text-sm font-semibold mb-1 drop-shadow-sm">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full p-3 rounded-lg bg-white/20 text-white outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 drop-shadow-sm">
              {isemailverified ? "✅ Email Verified" : "❌ Email Not Verified"}
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 drop-shadow-sm">Display Name</label>
            <input
              type="text"
              value={displayname}
              onChange={(e) => setdisplayname(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white outline-none"
            />
          </div>

          <button
            disabled={loading}
            onClick={handleProfileUpdate}
            className={`w-full py-3 text-white rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all font-semibold ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

          <button
            disabled={loading}
            onClick={handleEmailVerification}
            className={`w-full py-3 text-white rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all font-semibold ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

          <button
            disabled={loading}
            onClick={handleSignout}
            className={`w-full py-3 text-white rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all font-semibold ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Logging out..." : "Log Out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
