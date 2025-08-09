"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginType } from "@/lib/validation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // handle submit
  const onSubmit = (data: LoginType) => {
    console.log("Login data:", data);
    // handle login logic here
  };

  return (
    <div className="py-10 px-4">
      <div className="w-full md:max-w-xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-medium text-center">
          Log in to your account
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-6 bg-white p-6 rounded-lg shadow-sm"
        >
          {/* email input */}
          <div>
            <Label htmlFor="email" className="block mb-2">
              Email
            </Label>
            <Input
              type="email"
              {...register("email")}
              id="email"
              className="border md:py-5 border-black/80 w-full 
                         focus:border-2 focus:border-black focus:ring-0 focus-visible:ring-0 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* password input */}
          <div>
            <Label htmlFor="password" className="block mb-2">
              Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                id="password"
                placeholder="Enter your password"
                className="pr-10 w-full border border-black/80 md:py-5 
                           focus:border-2 focus:border-black focus:ring-0 focus-visible:ring-0 focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  Password is required
                </p>
              )}
              <span
                role="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-3 cursor-pointer"
              >
                {showPassword ? (
                  <Eye color="black" size={20} />
                ) : (
                  <EyeOff color="black" size={20} />
                )}
              </span>
            </div>
          </div>

          {/* submit button */}
          <div className="w-full flex justify-center">
            <Button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-green-700 hover:bg-green-500 cursor-pointer"
            >
              Log in
            </Button>
          </div>

          {/* link to signup */}
          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-green-800">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
