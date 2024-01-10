"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorText from "./error-text";
import SuccessText from "./success-text";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
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
import { resetPassword } from "@/actions/reset-password";

export const resetFormSchema = z.object({
  email: z.string().email(),
});

const ResetForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof resetFormSchema>>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      email: "",
    },
  });

  //On submit
  function onSubmit(values: z.infer<typeof resetFormSchema>) {
    resetPassword(values).then((data) => {
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
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
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
                Send reset mail
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

export default ResetForm;
