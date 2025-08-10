import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

type SubmitButtonProps = React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
};

const SubmitButton = ({
  children,
  isLoading = false,
  disabled,
  ...props
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading || disabled}
      {...props}
      className="w-full sm:w-auto px-8 py-4 bg-green-700 hover:bg-green-500 cursor-pointer min-w-[180px] flex items-center justify-center"
    >
      {isLoading ? <Loader className="animate-spin h-5 w-5" /> : children}
    </Button>
  );
};

export default SubmitButton;
