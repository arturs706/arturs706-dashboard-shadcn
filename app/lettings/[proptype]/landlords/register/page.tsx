"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import loginAction from './landlord-actions';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';



const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof formSchema>;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function formatFieldError(fieldError: string | { errors: string[] }): string {
    if (typeof fieldError === 'string') {
      return fieldError;
    }
    if (Array.isArray(fieldError.errors)) {
      return fieldError.errors.join(", ");
    }
    return "An error occurred";
  }

  async function onSubmit(values: LoginFormData) {
    setLoading(true);
    setError("");
    try {
      const [data, actionError] = await loginAction(values);
      if (actionError) {
        if (actionError.formattedErrors) {
          Object.entries(actionError.formattedErrors).forEach(([field, fieldErrors]) => {
            form.setError(field as keyof LoginFormData, {
              type: "manual",
              message: formatFieldError(fieldErrors as unknown as string | { errors: string[] })
            });
          });
        } else {
          setError(actionError.message || "An error occurred during login.");
        }
      } else if (data && data.errors) {
        const errorsLength = Object.keys(data.errors).length;
        if (errorsLength === 0) {          
          form.reset();
        }
       
        Object.entries(data.errors).forEach(([field, error]) => {
          if (error) {
            form.setError(field as keyof LoginFormData, {
              type: "manual",
              message: formatFieldError(error as string | { errors: string[] })
            });
          }
        });
      } else {
        
        form.reset();
      }
    } catch (error) {
        
      setError("error" + error);
    } finally {
      setLoading(false);
      router.push('/'); 
    }
  }

  return (
    <main className="container mx-auto p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
          <BreadcrumbLink href="/lettings/landlords">Landlords</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Register</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your username and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Username</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="********" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Login'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

