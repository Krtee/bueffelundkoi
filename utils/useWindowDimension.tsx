import { useEffect, useState } from "react";

const getWindowDimensions = (): { width: number; height: number } => {
  // make sure your function is being called in client side only
  if (typeof window === "undefined") {
    return {
      width: 0,
      height: 0,
    };
  }
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
