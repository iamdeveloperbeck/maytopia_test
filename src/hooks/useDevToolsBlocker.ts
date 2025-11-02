import { useEffect } from "react";

export const useDevToolsBlocker = (onDetect?: () => void) => {
  useEffect(() => {
    let blocked = false;

    const detectBySize = () => {
      const threshold = 160;
      if (
        Math.abs(window.outerWidth - window.innerWidth) > threshold ||
        Math.abs(window.outerHeight - window.innerHeight) > threshold
      ) {
        if (!blocked) {
          blocked = true;
          onDetect?.();
        }
      }
    };

    const detectByDebugger = () => {
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger; // devtools ochilganda bu to‘xtaydi
      const end = performance.now();
      if (end - start > 100) {
        if (!blocked) {
          blocked = true;
          onDetect?.();
        }
      }
    };

    const detectByKey = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
      ) {
        e.preventDefault();
        onDetect?.();
      }
    };

    const detectByContext = (e: MouseEvent) => {
      e.preventDefault();
      onDetect?.();
    };

    window.addEventListener("keydown", detectByKey, true);
    window.addEventListener("contextmenu", detectByContext, true);
    const interval = setInterval(() => {
      detectBySize();
      detectByDebugger();
    }, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", detectByKey, true);
      window.removeEventListener("contextmenu", detectByContext, true);
    };
  }, [onDetect]);
};
