"use client";
import { onAuthStateChanged, User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
      else {
        setUser(user);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading || !user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Home</h1>
      <h2>Email: {user.email}</h2>
      <Button>Logout</Button>
    </div>
  );
}

export default Home;
