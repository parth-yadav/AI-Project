// useAuth.ts
"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed. Current user:", currentUser);

      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        router.push("/auth"); // Redirect to auth page if not signed in
      }

      setLoading(false); // Mark authentication state as loaded
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  const userId = user?.uid || null;

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth); // Sign out the user
      setUser(null); // Clear the user state
      router.push("/auth"); // Redirect to the auth page
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return { user, userId, loading, logout };
};
