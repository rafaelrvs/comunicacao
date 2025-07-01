"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type FormRootProps = React.ComponentProps<"form"> & {
  children: ReactNode;
};

export default function FormRoot({
  children,
  className,
  action,
}: FormRootProps) {
  return (
    <motion.form
      className={className}
      action={action}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.form>
  );
}
