"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Social from "./social";
import Footer from "./footer";
import { Button } from "./ui/button";
import ErrorText from "./error-text";
import SuccessText from "./success-text";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters",
  }),
});

const LoginForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const errorUrl =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already in use with different provider!"
      : "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //On submit
  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values).then((data) => {
      setError(data.error);
      setSuccess(data.success);
    });
  }

  return (
    <div className="w-[550px]">
      <Card className="w-full flex flex-col">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">🛡️ Auth</CardTitle>
          <CardDescription>Welcome back</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Error text */}
              <ErrorText message={(error as string) || (errorUrl as string)} />
              {/* Success text */}
              <SuccessText message={success as string} />
              <Button size={"sm"} variant={"link"} className="px-0">
                <Link href={"/auth/reset"}>Forgot password?</Link>
              </Button>
              <Button className="w-full font-semibold">Login</Button>
            </form>
          </Form>
          <Social />
        </CardContent>
        <CardFooter>
          <Footer text="Don't have an account?" path="/auth/register" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
