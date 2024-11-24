import * as React from "react";

import { Button } from "../../ui/button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FloatingInput, FloatingLabelInput, FloatingLabelInputProps } from ".";

export const FloatingPasswordInput = React.forwardRef<
  React.ElementRef<typeof FloatingInput>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, className, type, ...props }, ref) => {
  const [isPassword, setIsPassword] = React.useState<boolean>(true);

  const triggerPasswordInput = () => {
    setIsPassword((prev) => !prev);
  };

  return (
    <>
      <div className="relative">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute z-10 p-0.5 top-1/2 right-2 -translate-y-1/2 rounded-full"
          onClick={triggerPasswordInput}
        >
          {isPassword ? <FiEye /> : <FiEyeOff />}
        </Button>
        <FloatingLabelInput
          id={id}
          label={label}
          type={isPassword ? "password" : "text"}
          ref={ref}
          {...props}
        />
      </div>
    </>
  );
});
