'use client';

import { useEffect, useRef } from "react";
import { useTimeline } from "../timeline.context";

export function useStage({
  x = 0,
  y = 0,
}) {
  const { setStage } = useTimeline();
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if(!ref?.current) return;
    const el = ref.current;
    function updateStage() {
      setStage({
        width: el.clientWidth + x,
        height: el.clientHeight + y,
        size: {
          width: el.clientWidth,
          height: el.clientHeight,
        }
      });
    }

    window.addEventListener("resize", updateStage);
    updateStage();

    return () => {
      window.removeEventListener("resize", updateStage);
    }
  }, [ref]);

  return {
    ref,
  };
}