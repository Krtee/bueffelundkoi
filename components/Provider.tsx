"use client";

import { NextUIProvider } from "@nextui-org/react";

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
export default Provider;
