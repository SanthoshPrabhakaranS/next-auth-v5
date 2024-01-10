"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ErrorCard = () => {
  const router = useRouter();
  return (
    <div className="w-[550px]">
      <Card className="w-full flex flex-col justify-center items-center">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">🛡️ Auth</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-center font-medium">
            Oops! Something went wrong!
          </p>
          <Button
            onClick={() => {
              router.push("/auth/login");
            }}
            variant={"ghost"}
            className="w-full flex justify-center items-center"
          >
            Back to login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorCard;
