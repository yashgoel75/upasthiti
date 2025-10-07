"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

function TestFirebase() {
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const testConnection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "test"));
        console.log("Firestore connected ✅");
        console.log(
          "Documents:",
          querySnapshot.docs.map((doc) => doc.data()),
        );
        setStatus("✅ Firestore connection successful!");
      } catch (error) {
        console.error("Firestore error ❌", error);
        setStatus(
          "❌ Firestore connection failed: " + (error as Error).message,
        );
      }
    };
    testConnection();
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Firebase Connection Test</h1>
      <p className="mt-4">{status}</p>
    </div>
  );
}

export default TestFirebase;
