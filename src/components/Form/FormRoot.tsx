"use client";
import { ReactNode } from "react";


type FormRootProps = React.ComponentProps<"form"> & {
  children: ReactNode;
};

export default function FormRoot({
  children,
  ...props
}: FormRootProps) {
  return (
    <form className={""} {...props}>
      {children}
    </form>
  );
}