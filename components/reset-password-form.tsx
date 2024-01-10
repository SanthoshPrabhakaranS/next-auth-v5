"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorText from "./error-text";
import SuccessText from "./success-text";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { newPassword } from "@/actions/new-password";

export const newPasswordFormSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const ResetPasswordForm = () => {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof newPasswordFormSchema>>({
    resolver: zodResolver(newPasswordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  //On submit
  function onSubmit(values: z.infer<typeof newPasswordFormSchema>) {
    newPassword(values, token as string).then((data) => {
      setError(data?.error);
      setSuccess(data?.success);
    });
  }

  return (
    <div className="w-[550px]">
      <Card className="w-full flex flex-col justify-center items-center">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">🛡️ Auth</CardTitle>
        </CardHeader>
        <CardContent className="w-full space-y-6 flex flex-col">
          <p className="text-muted-foreground text-center font-medium">
            Reset password
          </p>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                {/* Error text */}
                <ErrorText message={error as string} />
                {/* Success text */}
                <SuccessText message={success as string} />
              </div>
              <Button
                onClick={() => {
                  // router.push("/auth/login");
                }}
                className="w-full flex justify-center items-center"
              >
                Reset password
              </Button>
            </form>
          </Form>
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

export default ResetPasswordForm;
