"use client";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const getCats = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",  
            "authorization": `Bearer ${session?.user?.token}`,
        },
  
    });
    const data = await response.json();
    console.log(data);
    return data;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <button onClick={getCats} className="btn btn-primary">get cats</button>
    </div>
  );
};
export default Dashboard;
