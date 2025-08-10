"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { countries } from "@/data/countries";
import { registrationSchema, type RegistrationType } from "@/lib/validation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUserAction } from "@/actions/auth.actions";
import Popup from "@/components/popup/Popup";
import { toast } from "sonner";
import SubmitButton from "@/components/button/SubmitButton";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [countriesToShow, setCountriesToShow] = useState([...countries]);
  const [checked, setChecked] = useState(false); // frontend only
  const [role, setRole] = useState<"FREELANCER" | "CLIENT">("FREELANCER");
  const [otpLink, setOtpLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      country: "",
      role: role,
    },
  });

  const selectedCountry = watch("country");

  const router = useRouter();

  // handle country search
  const handleSearch = (value: string) => {
    setCountriesToShow(
      countries.filter((country) =>
        country.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  // handle submit
  const onSubmit = async (formData: RegistrationType) => {
    if (!checked) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    try {
      setIsLoading(true);

      const payload = { ...formData, role };
      console.log(payload);

      const response = await registerUserAction(payload);

      if (response.success && response.otpLink) {
        toast.success(response.message);
        setOtpLink(response.otpLink);
        setIsOpen(true);
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-10 px-4">
      {/* show OTP link here */}
      {otpLink && (
        <Popup
          isOpen={isOpen}
          title="Get Your OTP"
        >
          <p className="text-green-800 mb-4">
            Click on this link to get OTP -{" "}
            <Link
              href={otpLink}
              target="_blank"
              className="underline font-semibold hover:text-green-900"
            >
              Get OTP
            </Link>
          </p>
          <Button
            onClick={() => {
              setOtpLink("");
              router.push("/email-verification");
            }}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Verify Email
          </Button>
        </Popup>
      )}

      <div className="w-full md:max-w-2xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-medium text-center">
          Sign up to find work you love
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-6 bg-white p-6 rounded-lg"
        >
          {/* role selection */}
          <Label className="mb-2 block">Select a role</Label>
          <div className="flex gap-4">
            <div
              onClick={() => setRole("FREELANCER")}
              className={`flex-1 border rounded-lg p-4 text-center cursor-pointer transition
                ${
                  role === "FREELANCER"
                    ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                    : "border-black/50 hover:border-green-500"
                }`}
            >
              Register as Freelancer
            </div>
            <div
              onClick={() => setRole("CLIENT")}
              className={`flex-1 border rounded-lg p-4 text-center cursor-pointer transition
                ${
                  role === "CLIENT"
                    ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                    : "border-black/50 hover:border-green-500"
                }`}
            >
              Register as Client
            </div>
          </div>

          {/* name input */}
          <div className="flex flex-col md:flex-row gap-5">
            {/* first name */}
            <div className="flex-1">
              <Label htmlFor="firstName" className="mb-2 block">
                First name
              </Label>
              <Input
                type="text"
                {...register("firstName")}
                id="firstName"
                className="md:py-5 bg-transparent border border-black/80 text-sm w-full  focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0   focus:outline-none"
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.firstName.message || "First name is required"}
                </p>
              )}
            </div>

            {/* last name */}
            <div className="flex-1">
              <Label htmlFor="lastName" className="mb-2 block">
                Last name
              </Label>
              <Input
                type="text"
                {...register("lastName")}
                id="lastName"
                className="border md:py-5 border-black/80 w-full 
                           focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.lastName.message || "Last name is required"}
                </p>
              )}
            </div>
          </div>

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
                         focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
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
                placeholder="Password (8 or more characters)"
                className="pr-10 w-full border border-black/80 md:py-5 
                           focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message || "Password is required"}
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

          {/* country */}
          <div>
            <Label className="mb-2 block">Country</Label>
            <Select
              onValueChange={(value) => setValue("country", value)}
              value={selectedCountry}
            >
              <SelectTrigger className="w-full border border-black/80 py-5 focus:border-2 focus-visible::border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>

              <SelectContent className="max-h-[300px] overflow-auto">
                {/* search for country (sticky so it doesn't scroll away) */}
                <div className="sticky top-0 bg-white z-10 p-2 border-b">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search..."
                      onChange={(e) => handleSearch(e.target.value)}
                      onKeyDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                      className="pr-10 border border-black/80 focus:border-2 focus-visible:border-green-500 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                    />
                    <Search className="absolute right-2 top-2" size={18} />
                  </div>
                </div>

                {countriesToShow.map((country) => (
                  <SelectItem value={country.name} key={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-red-600 text-sm mt-1">
                {errors.country.message || "Country is required"}
              </p>
            )}
          </div>

          {/* agreement check */}
          <div className="flex items-start gap-3">
            <Checkbox
              checked={checked}
              onCheckedChange={(val) => setChecked(!!val)}
              className="size-5 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 
                         border border-black/80 focus:border-2 focus-visible:border-green-500  focus:ring-0 focus-visible:ring-0 focus:outline-none"
            />
            <p className="text-sm">
              Yes, I understand and agree to the{" "}
              <span className="text-green-700 underline cursor-pointer">
                WeWork Terms of Service
              </span>
              , including the{" "}
              <span className="text-green-700 underline cursor-pointer">
                User Agreement and Privacy Policy
              </span>
              .
            </p>
          </div>

          {/* submit button */}
          <div className="w-full flex justify-center">
            <SubmitButton isLoading={isLoading} disabled={isLoading}>
              Register your account
            </SubmitButton>
          </div>

          {/* link to login */}
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-green-800">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
