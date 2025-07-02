"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import { auth } from "@/config/firebaseconfig";
import Image from "next/image";

const Profile = () => {
  const [loading, setloading] = useState<boolean>(false);
  const [email, setemail] = useState<string>("");
  const [displayname, setdisplayname] = useState<string>("");
  const [photourl, setphotourl] = useState<string>("");
  const [isemailverified, setisemailverified] = useState<boolean>(false);
  const [error, seterror] = useState<string>("");
  const router = useRouter();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName as string;
        const email = user.email as string;
        const photoURL = user.photoURL as string;
        const emailVerified = user.emailVerified as boolean;
        const uid = user.uid as string;
        setemail(email);
        setdisplayname(displayName);
        setphotourl(photoURL);
        setisemailverified(emailVerified);
        console.log("User is signed in! : ", user)
      } else{
        seterror("User not signed in!")
        console.log("User not signed in!")
      }
    });
  }, []);

  const handleEmailVerification = async()=>{
    setloading(true);
    seterror("");
    try{
      const user = auth.currentUser;
      if(!user){
        console.log("No user found to send verification email!")
        seterror("No user found to send verification email!");
      } else {
        sendEmailVerification(user)
          .then(() => {
            console.log("Verification email sent to the user : ", user);
          })
          .catch((error: Error) => {
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            seterror(errorMessage);
            console.error("Error during logout:", errorMessage);
          });
      }
    }catch (error: Error | any) {
      seterror(error instanceof Error ? error.message : "An error occurred");
      console.error("Error during logout:", error);
    } finally {
      setloading(false);
    }
  };

  const handleSignout = async () => {
    setloading(true);
    seterror("");
    try {
      signOut(auth)
        .then(() => {
          console.log("User logged out successfully:");
          router.push("/signin");
        })
        .catch((error: Error) => {
          const errorMessage = error instanceof Error ? error.message : "An error occurred";
          seterror(errorMessage);
          console.error("Error during logout:", errorMessage);
        });
    } catch (error: Error | any) {
      seterror(error instanceof Error ? error.message : "An error occurred");
      console.error("Error during logout:", error);
    } finally {
      setloading(false);
    }
  };

  const handleProfileUpdate = async()=>{
    setloading(true);
    seterror("");
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No user found to update profile!");
        seterror("No user found to update profile!");
      } else {
        updateProfile(user, {
          displayName: displayname ? displayname : "",
          photoURL: photourl ? photourl : ""
        })
          .then(() => {
            console.log("Profile updated successfully : ", user);
          })
          .catch((error: Error) => {
            const errorMessage =
              error instanceof Error ? error.message : "An error occurred";
            seterror(errorMessage);
            console.error("Error during profile updation :", errorMessage);
          });
      }
    } catch (error: Error | any) {
      seterror(error instanceof Error ? error.message : "An error occurred");
      console.error("Error during profile updation:", error);
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p className="text-blue-500 mb-4">Loading...</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <label className="block text-sm font-medium text-gray-700">
            {isemailverified ? "Email Verified" : "Email Not Verified"}
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <label className="block text-sm font-medium text-gray-700">
            Display Name
          </label>
          <input
            type="text"
            value={displayname}
            onChange={(e)=>setdisplayname(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            disabled={loading}
            onClick={handleProfileUpdate}
            className={`w-full bg-blue-500 text-white p-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
          {/* <label className="block text-sm font-medium text-gray-700">
            Photo
          </label>
          <input
            type="text"
            value={photourl}
            onChange={(e)=>setphotourl(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            disabled={loading}
            onClick={handleProfileUpdate}
            className={`w-full bg-blue-500 text-white p-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <Image
            src={photourl}
            alt={photourl ? photourl : "Profile Image"}
            width={100}
            height={100}
            className="mt-1 block w-full h-auto rounded-md"
          /> */}
          <button
            disabled={loading}
            onClick={handleEmailVerification}
            className={`w-full bg-blue-500 text-white p-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Verifying email..." : "Verify email"}
          </button>
          <button
            disabled={loading}
            onClick={handleSignout}
            className={`w-full bg-blue-500 text-white p-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
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
