import { useEffect, useState } from "react";

export const useMouseCoords = () => {
  const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMouseCoords = (event: MouseEvent) =>
      setMouseCoords({ x: event.clientX, y: event.clientY });

    window.addEventListener("mousemove", updateMouseCoords);
    return () => {
      window.removeEventListener("mousemove", updateMouseCoords);
    };
  }, []);
  return mouseCoords;
};
