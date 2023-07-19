'use client';

import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { lerp } from "@/utils/math";
import { useViewport } from "./hooks/useViewport";

interface Props {
  height: number;
  offset: number;
}

interface InfoProps {
  x: number;
  y: number;
  width: number;
  height: number;
}


const MIN_WIDTH = 50;
export function Scroll({
  height,
  offset,
}: Props) {
  const {
    timeline: { editor, stage },
    updateViewport,
  } = useViewport();

  const [isDragging, setIsDragging] = useState(false);
  const [ maxSize, setMaxSize ] = useState<number>(0);

  useEffect(() => {
    setMaxSize((editor.rect.width / stage.width) * stage.size.width);
  }, [ stage, editor, maxSize ]);

  useEffect(() => {
    if(isDragging) return;
    const final = (stage.size.width - maxSize - (offset));
    const x = lerp(0, final, editor.percentage);
    setInfo(p => ({ ...p, x }));
  }, [ editor.percentage, maxSize, isDragging ]);

  const w = lerp(maxSize, MIN_WIDTH, editor.zoom / 100);
  const [ info, setInfo ] = useState<InfoProps>({
    width: 100,
    height,
    x: 463,
    y: 0,
  });


  // useEffect(() => {
  //   console.log({ w })
  // }, [ w ]);

  // useEffect(() => {
  //   console.log(info.x);
  //   // const percentage = (info.x / (width - info.width)) || 0;
  //   // onChange(percentage);
  // }, [ info ]);

  function onUpdate(e: any, direction: any, ref: any, delta: any, position: any) {
    const percentage = (position.x / (stage.size.width - info.width)) || 0;
    console.log(percentage);
    // editor.setPercentage(percentage);
  }

  function onDrag(e: any, d: any) {
    e.preventDefault();
    e.stopPropagation();
    const max = stage.size.width - (offset / 2);
    const w = lerp(maxSize, MIN_WIDTH, editor.zoom / 100);
    const size = max - w;
    const percentage = (d.x) / (size - (offset / 2));

    updateViewport(percentage);
    setInfo(p => ({...p, x: d.x, y: d.y }));
  }

  return (
      <Rnd
        bounds={'parent'}
        dragAxis="x"
        size={{ width: w, height: info.height }}
        enableResizing={{
          bottom: false,
          bottomLeft: false,
          bottomRight: false,
          left: true,
          right: true,
          top: false,
          topLeft: false,
          topRight: false
        }}
        position={{ x: info.x, y: info.y }}
        onDrag={onDrag}
        onDragStart={() => setIsDragging(true)}
        onDragStop={() => setIsDragging(false)}
        onResize={(e, direction, ref, delta, position) => {
          // setInfo({
          //   width: parseFloat(ref.style.width.replace('px', '')),
          //   height: parseFloat(ref.style.height.replace('px', '')),
          //   ...position,
          // });
        }}
      >
        <div className="w-full h-full bg-gray-500 rounded-lg opacity-30 hover:opacity-100 active:opacity-100" />
      </Rnd>
  )
}