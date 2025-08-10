"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { z } from "zod";
import { verifyOtpAndLoginAction } from "@/actions/auth.actions";
import { toast } from "sonner";
import SubmitButton from "@/components/button/SubmitButton";

// Schema with regex email validation
const otpSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});
type OtpType = z.infer<typeof otpSchema>;

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpType>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const [otpValue, setOtpValue] = useState("");

  const onSubmit = async (data: OtpType) => {
    try {
      setIsLoading(true);
      console.log("Verification data:", data);
      // handle verification logic here
      const response = await verifyOtpAndLoginAction(data);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error("Error during verification:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-10 px-4">
      <div className="w-full md:max-w-md mx-auto">
        <h3 className="text-3xl md:text-4xl font-medium text-center">
          Verify Email
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-6 bg-white p-6 rounded-lg "
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
              className="border md:py-5 border-black/80 w-full  focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* otp input */}
          <div>
            <Label className="block mb-2">Enter OTP</Label>
            <div className="w-full">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={(value) => {
                  setOtpValue(value);
                  setValue("otp", value);
                }}
                className="w-full gap-2"
              >
                <InputOTPGroup className="w-full gap-2">
                  <InputOTPSlot
                    index={0}
                    className="flex-1 border border-black/80 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                  />
                  <InputOTPSlot
                    index={1}
                    className="flex-1 border border-black/80 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                  />
                  <InputOTPSlot
                    index={2}
                    className="flex-1 border border-black/80 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                  />
                  <InputOTPSlot
                    index={3}
                    className="flex-1 border border-black/80 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                  />
                  <InputOTPSlot
                    index={4}
                    className="flex-1 border border-black/80 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                  />
                  <InputOTPSlot
                    index={5}
                    className="flex-1 border border-black/80 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {errors.otp && (
              <p className="text-red-600 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          {/* submit button */}
          <div className="w-full flex justify-center">
            <SubmitButton isLoading={isLoading} disabled={isLoading}>Submit OTP</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
