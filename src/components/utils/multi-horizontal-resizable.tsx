import { useState } from "react";
import { HorizontalResizable } from "./horizontal-resizable";


export function MultiHorizontalResizable({ w, h, steps }: any) {
  let configs = [] as any;

  let x: number = 0, y: number = 0;
  
  steps.forEach((percentage: number) => {
    if(percentage === 0) return;
    configs.push({
      x,
      y,
      width: (w * percentage) - x,
      height: h,
    });
    x += w * percentage;
  });

  return (
    <div className="mb-6 flex">
    {
      configs.map((config: any, i: number) => (
        <div className="relative inline-flex" style={{ height: config.height, width: config.width }} key={i}>
        <HorizontalResizable w={config.width} h={config.height} x={config.x} y={config.y}>
          <div className="w-full top-0 h-full bg-emerald-500 relative z-20">
            <div className="pointer-events-none absolute bg-emerald-300 rounded-full" style={{ width: 12, height: 12, top: -1, left: -6}} />
            <div className="pointer-events-none absolute bg-emerald-300 rounded-full" style={{ width: 12, height: 12, top: -1, right: -6}} />
          </div>
        </HorizontalResizable>
        </div>
      ))
    }
    </div>
  )
}