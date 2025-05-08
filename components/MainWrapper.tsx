"use client";

import React, { useEffect, useRef } from "react";
import { useWindowDimensions } from "../utils/useWindowDimension";

type Props = {
  children: React.ReactNode;
};

const MainWrapper = ({ children }: Props) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { height } = useWindowDimensions();

  const appHeight = () => {
    if (mainRef.current) {
      mainRef.current.style.height = `${height}px`;
    }
  };

  useEffect(() => {
    appHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

  return (
    <main className={"main w-full"} ref={mainRef}>
      {children}
    </main>
  );
};

export default MainWrapper;
