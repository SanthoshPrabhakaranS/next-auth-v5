"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import React from "react";

const ServerCard = ({ title }: { title: string }) => {
  const { data } = useSession();

  return (
    <div className="w-[900px] shadow-sm mt-[2rem]">
      <Card className="w-full flex flex-col justify-center items-center">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">🖥 {title}</CardTitle>
        </CardHeader>
        <CardContent className="w-full space-y-4 flex flex-col text-sm font-medium">
          <div className="w-full flex justify-between items-center border p-3 rounded-md">
            <p>Id</p>
            <p>{data?.user?.id}</p>
          </div>
          <div className="w-full flex justify-between items-center border p-3 rounded-md">
            <p>Name</p>
            <p>{data?.user?.name}</p>
          </div>
          <div className="w-full flex justify-between items-center border p-3 rounded-md">
            <p>Email</p>
            <p>{data?.user?.email}</p>
          </div>
          <div className="w-full flex justify-between items-center border p-3 rounded-md">
            <p>Role</p>
            <p>{data?.user?.role}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerCard;
