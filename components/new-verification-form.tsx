"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/actions/email-verification";
import ErrorText from "./error-text";
import SuccessText from "./success-text";

const NewVerificationForm = () => {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token not found!");
      return;
    }

    newVerification(token).then((data) => {
      setError(data.error);
      setSuccess(data.success);
    });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="w-[550px]">
      <Card className="w-full flex flex-col justify-center items-center">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">🛡️ Auth</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 flex flex-col justify-center items-center">
          <p className="text-muted-foreground text-center font-medium">
            Confirming your verification
          </p>
          <div>
            {/* Error text */}
            <ErrorText message={error as string} />
            {/* Success text */}
            <SuccessText message={success as string} />
            {!success && !error && <BeatLoader />}
          </div>
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

export default NewVerificationForm;
