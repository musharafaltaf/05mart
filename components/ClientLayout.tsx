"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoading(false);
    },1900);

    return ()=>clearTimeout(timer);
  },[]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[9999] bg-white">
          <Loading />
        </div>
      )}

      {children}
    </>
  );
}