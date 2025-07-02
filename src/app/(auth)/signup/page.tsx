'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification
} from "firebase/auth";
import { auth } from '@/config/firebaseconfig';
import googleprovider from '@/providers/googleprovider';

const Signup = () => {
    const [email, setemail] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [confirmpassword, setconfirmpassword] = useState<string>("");
    const [error, seterror] = useState<string>("");
    const [loading, setloading] = useState<boolean>(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloading(true);
        seterror("");
        try {
            if(password !== confirmpassword) {
                seterror("Passwords do not match");
                return;
            }
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                sendEmailVerification(user)
                    .then(() => {
                    console.log("Verification email sent to the user : ", user);
                    })
                    .catch((error: Error) => {
                    const errorMessage = error instanceof Error ? error.message : "An error occurred";
                    seterror(errorMessage);
                    console.error("Error during logout:", errorMessage);
                    });
                console.log("User signed up successfully:", user);
                router.push("/signin");
            })
            .catch((error : Error) => {
                const errorMessage = error instanceof Error ? error.message : "An error occurred";
                seterror(errorMessage);
                console.error("Error during signup:", errorMessage);
            });
        } catch (error : Error | any) {
            seterror(error instanceof Error ? error.message : "An error occurred");
            console.error("Error during signup:", error);
        } finally {
            setloading(false);
        }
    }

    // const handleSignInWithGoogle = async()=>{
    //     try{
    //         signInWithPopup(auth, googleprovider)
    //         .then((result) => {
    //             // This gives you a Google Access Token. You can use it to access the Google API.
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             if(!credential){
    //                 console.log("No credentials received during google sign-in")
    //             }
    //             const token = credential?.accessToken;
    //             const user = result.user;
    //             console.log("User logged in with google successfully:", user);
    //             router.push("/profile");
    //         }).catch((error) => {
    //             const errorMessage = error instanceof Error ? error.message : "An error occurred";
    //             seterror(errorMessage);
    //             console.error("Error during signup:", errorMessage);
    //             const email = error.customData.email;
    //             const credential = GoogleAuthProvider.credentialFromError(error);
    //         });
    //     }catch (error : Error | any) {
    //         seterror(error instanceof Error ? error.message : "An error occurred");
    //         console.error("Error during signup:", error);
    //     } finally {
    //         setloading(false);
    //     }
    // }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSignup}>
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
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmpassword}
                            onChange={(e) => setconfirmpassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form> 
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-500">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                {/* <button
                    onClick={handleSignInWithGoogle}
                    className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                >
                    Sign Up with Google
                </button> */}
                <p className="mt-4 text-sm text-center">
                    Already have an account?{" "}
                    <a href="/signin" className="text-blue-500 hover:underline">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Signup;
