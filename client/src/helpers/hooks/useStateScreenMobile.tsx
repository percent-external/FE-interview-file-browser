import { useState, useEffect } from "react";
import { breakpoints } from "@helpers/styles";

export const useStateScreenMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>();

  const updateIsMobile = () =>
    window && setIsMobile(window.innerWidth < breakpoints.lg);

  useEffect(() => {
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  return isMobile;
};
