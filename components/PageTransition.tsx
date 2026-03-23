"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: any){

const pathname = usePathname();

return (
<motion.div
  key={pathname}
  initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.5 }}
>
  {children}
</motion.div>
);
}