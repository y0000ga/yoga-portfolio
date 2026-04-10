import classNames from "classnames";
import { ComponentProps } from "react";

interface IProps extends ComponentProps<"button"> {
  variant: "primary" | "secondary" | "inverted" | "outlined";
  size: "sm" | "md" | "lg";
}
const Button = ({
  variant,
  size,
  type,
  disabled,
  ...props
}: IProps) => {
  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      {...props}
      className={classNames(
        props.className,
        "w-full rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:w-3/4",
        {
          "px-2 py-1 text-[12px] font-semibold md:px-3 md:py-2 md:text-[16px]":
            size === "sm",
          "max-w-150 px-4 py-2.5 text-[14px] font-bold md:px-8 md:py-5 md:text-[28px]":
            size === "lg",
          "px-3 py-1.5 text-[10px] font-bold md:px-4 md:py-3 md:text-[20px]":
            size === "md",
        },
        {
          "bg-primary-T10 text-surface-T30 cursor-pointer":
            variant === "primary",
          "bg-surface-T30 text-text-T10 cursor-pointer":
            variant === "secondary",
          "bg-surface-T40 text-primary-T10 cursor-pointer":
            variant === "inverted",
          "border-primary-T10 text-primary-T10 cursor-pointer border bg-transparent":
            variant === "outlined",
        },
      )}
    />
  );
};

export default Button;
