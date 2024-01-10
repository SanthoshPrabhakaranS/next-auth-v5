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
import { register } from "@/actions/register";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  name: z.string().min(2, {
    message: "Name required!",
  }),
});

const RegisterForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  //On submit
  function onSubmit(values: z.infer<typeof registerSchema>) {
    register(values).then((data) => {
      setError(data.error);
      setSuccess(data.success);
    });
  }

  return (
    <div className="w-[550px]">
      <Card className="w-full flex flex-col">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">🛡️ Auth</CardTitle>
          <CardDescription>Create an account</CardDescription>
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
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your name"
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
              <ErrorText message={error as string} />
              {/* Success text */}
              <SuccessText message={success as string} />
              <Button className="w-full font-semibold">Create an account</Button>
            </form>
          </Form>
          <Social />
        </CardContent>
        <CardFooter>
          <Footer text="Already have an account?" path="/auth/login" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterForm;
