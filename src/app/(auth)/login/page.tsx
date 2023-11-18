"use client";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginType, loginSchema } from "@/validation/authSchema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
  });

  const submit = async (payload: LoginType) => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message, { theme: "colored" });
    } else if (data.user) {
      toast.success("Logged in successfully", { theme: "colored" });
      router.push("/");
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-1  lg:grid-cols-2">
        {/* Auth Form */}
        <div className="flex justify-center items-center h-screen ">
          <Card className="min-w-[500px]">
            <CardHeader className="justify-center items-center">
              <Image src="/images/icon.png" width={32} height={32} alt="logo" />
              <Link href="/">
                <h1 className="font-bold text-2xl ml-2">FindProperty</h1>
              </Link>
            </CardHeader>
            <CardBody>
              <h1 className="text-2xl font-bold">Login</h1>
              <p>Buy or sell your home on your own terms.</p>
              <form onSubmit={handleSubmit(submit)} className="mt-5">
                <div className="mb-5">
                  <Input label="Email" type="email" {...register("email")} />
                  <span className="text-red-500">{errors.email?.message}</span>
                </div>
                <div className="mb-5">
                  <Input
                    label="Password"
                    type="password"
                    {...register("password")}
                  />
                  <span className="text-red-500">
                    {errors.password?.message}
                  </span>
                </div>
                <div className="mb-5">
                  <Button
                    className="w-full"
                    color="primary"
                    disabled={loading}
                    type="submit"
                    isLoading={loading}
                  >
                    Login
                  </Button>
                </div>
                <div className="text-center">
                  <p>
                    Don't have an account ?{" "}
                    <Link href="/register" className="text-blue-500 font-bold">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>

        {/* Image */}
        <div className="hidden lg:flex justify-center items-center px-10 ">
          <Image
            src="/images/property.svg"
            width={100}
            height={100}
            alt="Property image"
            className=" w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
