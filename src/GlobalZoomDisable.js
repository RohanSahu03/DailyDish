import React, { useEffect } from "react";

const GlobalZoomDisable = ({ children }) => {
  useEffect(() => {
    const preventZoom = (e) => {
      // Prevent zoom with Ctrl or Command + Scroll
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    const preventKeyZoom = (e) => {
      // Prevent zoom with Ctrl/Command + (+/-/0)
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "0")
      ) {
        e.preventDefault();
      }
    };

    // Add listeners to prevent zooming
    document.addEventListener("wheel", preventZoom, { passive: false });
    document.addEventListener("keydown", preventKeyZoom);

    // Cleanup listeners on unmount
    return () => {
      document.removeEventListener("wheel", preventZoom);
      document.removeEventListener("keydown", preventKeyZoom);
    };
  }, []);

  return <>{children}</>;
};

export default GlobalZoomDisable;
