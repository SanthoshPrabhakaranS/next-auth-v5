"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SuccessText from "@/components/success-text";
import RoleGate from "@/components/role-gate";
import { Role } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { auth } from "@/auth";
import { adminSeverAction } from "@/actions/admin-server-action";

const AdminPage = () => {
  const adminFunction = async () => {
    await fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Allowed API route!");
      } else {
        toast.error("Forbidden API route!");
      }
    });
  };

  const adminServerActionFunction = async () => {
    await adminSeverAction().then((res) => {
      if (res.success) {
        toast.success(res.success);
      } else {
        toast.error(res.error);
      }
    });
  };

  return (
    <div className="w-[900px] shadow-sm mt-[2rem]">
      <Card className="w-full flex flex-col justify-center items-center">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">🔑 Admin</CardTitle>
        </CardHeader>
        <CardContent className="w-full space-y-4 flex flex-col text-sm font-medium">
          <RoleGate>
            <SuccessText message="You are authenticated to access this content!" />
          </RoleGate>
          <div className="w-full flex justify-between items-center p-2 border shadow-sm rounded-md font-medium">
            <p>Admin-only action</p>
            <Button onClick={adminFunction}>Click to test</Button>
          </div>
          <div className="w-full flex justify-between items-center p-2 border shadow-sm rounded-md">
            <p>Server-only action</p>
            <Button onClick={adminServerActionFunction}>Click to test</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
