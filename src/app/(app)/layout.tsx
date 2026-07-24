import type { ReactNode } from "react";
import { CascaApp } from "@/componentes/layout/casca-app";

export default function LayoutApp({ children }: { children: ReactNode }) {
  return <CascaApp>{children}</CascaApp>;
}
