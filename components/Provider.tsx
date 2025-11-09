"use client";

import { HeroUIProvider } from "@heroui/react";

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
};
export default Provider;
