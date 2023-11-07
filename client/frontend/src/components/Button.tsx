import Image from "next/image";
import { MouseEventHandler } from "react";

type Props = {
  title: string;
  type?: "button" | "submit" | "reset";
  leftIcon?: string;
  rightIcon?: string;
  isSubmitting?: boolean;
  handleClick?: MouseEventHandler;
  bgColor?: string;
  textColor?: string;
};

export default function Button({
  title,
  type,
  leftIcon,
  isSubmitting = false,
  rightIcon,
  handleClick,
  bgColor,
  textColor,
}: Props) {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting || false}
      className={`flexCenter gap-3 px-4 py-3 
        ${textColor ? textColor : "text-white"} 
        ${
          isSubmitting ? "bg-black/50" : bgColor ? bgColor : "bg-primary-purple"
        } rounded-xl text-sm font-medium w-full`}
      onClick={handleClick}
    >
      {leftIcon && (
        <Image src={leftIcon} width={14} height={14} alt="left icon" />
      )}
      {title}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right icon" />
      )}
    </button>
  );
}